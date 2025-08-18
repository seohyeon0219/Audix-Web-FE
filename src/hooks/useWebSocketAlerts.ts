// src/hooks/useWebSocketAlerts.ts
import { useState, useEffect, useRef, useCallback } from 'react';
import {
    webSocketClient,
    DeviceAlertData,
    AlarmData,
    convertToAlarmData
} from '@/constants/websocket/client';

export const useWebSocketAlerts = () => {
    const [currentAlert, setCurrentAlert] = useState<AlarmData | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    // 모바일과 동일한 쓰로틀링 설정
    const lastAlertTimeRef = useRef(0);
    const modalThrottleMs = 1000; // 1초 간격 제한 (모바일과 동일)
    const wsSubscriptionRef = useRef<(() => void) | null>(null);

    // 모달 표시 (모바일과 동일한 로깅)
    const showAlert = useCallback((alarmData: AlarmData) => {
        console.log('🎭 웹 모달 표시:', {
            alarmId: alarmData.alarmId,
            regionName: alarmData.regionName,
            status: alarmData.status,
            type: alarmData.type,
            isSafety: alarmData.type === 'safety'
        });

        setCurrentAlert(alarmData);
        setIsModalVisible(true);
    }, []);

    // 모달 닫기 (모바일과 동일한 로깅)
    const hideAlert = useCallback(() => {
        console.log('🎭 웹 모달 닫기');
        setIsModalVisible(false);

        // 애니메이션 완료 후 데이터 정리
        setTimeout(() => {
            setCurrentAlert(null);
        }, 300);
    }, []);

    // WebSocket 연결 상태 확인
    const checkConnectionStatus = useCallback(() => {
        const connected = webSocketClient.isConnected();
        setIsConnected(connected);
        return connected;
    }, []);

    // WebSocket 초기화 및 알림 처리 (모바일과 동일한 로직)
    useEffect(() => {
        console.log('🚀 웹 WebSocket 알림 시스템 초기화');

        const initializeWebSocket = async () => {
            try {
                // WebSocket 연결
                webSocketClient.connect();
                console.log('✅ 웹 WebSocket 연결 시도');

                // 기존 구독 해제
                if (wsSubscriptionRef.current) {
                    wsSubscriptionRef.current();
                    wsSubscriptionRef.current = null;
                }

                // 알림 콜백 설정 (모바일과 동일한 쓰로틀링 로직)
                webSocketClient.setOnAlert((deviceData: DeviceAlertData) => {
                    const now = Date.now();

                    // 쓰로틀링: 모달이 열려있거나 너무 빠른 연속 알림 방지 (모바일과 동일)
                    if (isModalVisible && (now - lastAlertTimeRef.current < modalThrottleMs)) {
                        console.log('🚫 웹 모달 표시 스킵 (기존 모달 표시 중 또는 너무 빈번함):', {
                            timeSinceLastAlert: now - lastAlertTimeRef.current,
                            threshold: modalThrottleMs,
                            modalVisible: isModalVisible
                        });
                        return;
                    }

                    console.log('🚨 웹 WebSocket 알림 수신:', {
                        name: deviceData.name,
                        status: deviceData.status,
                        deviceId: deviceData.deviceId,
                        aiText: deviceData.aiText,
                        message: deviceData.message,
                        timeSinceLastAlert: now - lastAlertTimeRef.current
                    });

                    // DeviceAlertData를 AlarmData로 변환 (Safety 판별 로직 포함)
                    const alarmData = convertToAlarmData(deviceData);

                    console.log('🎭 웹 변환된 알람 데이터:', {
                        ...alarmData,
                        isSafetyAlarm: alarmData.type === 'safety'
                    });

                    // 자동 닫기 제거 - 오직 새 모달만 표시 (모바일과 동일)
                    console.log('🎭 웹 새 모달 표시');
                    showAlert(alarmData);
                    lastAlertTimeRef.current = now;

                    // 브라우저 알림도 표시 (웹 전용 기능)
                    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
                        // Safety 알람인 경우 더 긴급한 알림
                        const notificationTitle = alarmData.type === 'safety'
                            ? `🚨 긴급 안전 알람 - ${deviceData.name}`
                            : `⚠️ Audix Alert - ${deviceData.name}`;

                        const notificationOptions: NotificationOptions = {
                            body: alarmData.message,
                            icon: alarmData.type === 'safety' ? '/emergency-icon.ico' : '/favicon.ico',
                            tag: `alert-${deviceData.deviceId}`, // 중복 알림 방지
                            requireInteraction: alarmData.type === 'safety', // 안전 알람은 사용자 상호작용 필요
                        };

                        // vibrate는 일부 브라우저에서만 지원
                        if (alarmData.type === 'safety' && 'vibrate' in navigator) {
                            (notificationOptions as any).vibrate = [200, 100, 200];
                        }

                        new Notification(notificationTitle, notificationOptions);
                    }
                });

                console.log('✅ 웹 WebSocket 및 알림 시스템 초기화 완료');

            } catch (error) {
                console.error('❌ 웹 WebSocket 연결 실패:', error);
                setIsConnected(false);
            }
        };

        // 초기화 실행
        initializeWebSocket();

        // 연결 상태 주기적 확인 (5초마다)
        const connectionInterval = setInterval(() => {
            checkConnectionStatus();
        }, 5000);

        // 초기 연결 상태 확인 (1초 후)
        const initialCheckTimeout = setTimeout(() => {
            checkConnectionStatus();
        }, 1000);

        // 브라우저 알림 권한 요청 (웹 전용)
        if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                console.log('📱 브라우저 알림 권한:', permission);
            });
        }

        // 정리 함수 (모바일과 동일)
        return () => {
            console.log('🔌 웹 WebSocket 정리');

            // 구독 해제
            if (wsSubscriptionRef.current) {
                wsSubscriptionRef.current();
                wsSubscriptionRef.current = null;
            }

            // 인터벌 정리
            clearInterval(connectionInterval);
            clearTimeout(initialCheckTimeout);

            // WebSocket 연결 해제
            webSocketClient.disconnect();
        };
    }, [showAlert, checkConnectionStatus, isModalVisible]);

    // 수동 재연결 함수 (웹 전용 추가 기능)
    const reconnect = useCallback(async () => {
        console.log('🔄 웹 WebSocket 수동 재연결 시도');
        try {
            webSocketClient.disconnect();
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기
            webSocketClient.connect();

            // 연결 상태 확인
            setTimeout(() => {
                checkConnectionStatus();
            }, 2000);
        } catch (error) {
            console.error('❌ 웹 WebSocket 재연결 실패:', error);
        }
    }, [checkConnectionStatus]);

    // 연결 상태 모니터링 (웹 전용 디버깅 기능)
    const getConnectionDebugInfo = useCallback(() => {
        return {
            isConnected,
            lastAlertTime: lastAlertTimeRef.current,
            modalVisible: isModalVisible,
            currentAlert: currentAlert?.alarmId || null,
            currentAlertType: currentAlert?.type || null,
            isSafetyAlert: currentAlert?.type === 'safety',
            timeSinceLastAlert: Date.now() - lastAlertTimeRef.current,
        };
    }, [isConnected, isModalVisible, currentAlert]);

    return {
        currentAlert,
        isModalVisible,
        isConnected,
        showAlert,
        hideAlert,
        reconnect,
        getConnectionDebugInfo
    };
};