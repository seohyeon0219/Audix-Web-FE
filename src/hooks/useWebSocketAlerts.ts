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
            status: alarmData.status
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

    // 모바일과 동일한 상태 매핑 함수
    const mapDeviceStatusToCardState = useCallback((status: string): AlarmData['status'] => {
        const statusMap: Record<string, AlarmData['status']> = {
            'danger': 'danger',
            'warning': 'warning',
            'normal': 'normal',
            'repair': 'repair',
            'offline': 'offline',
            // 추가 매핑 (모바일과 동일)
            'error': 'danger',
            'alert': 'warning',
            'ok': 'normal',
            'maintenance': 'repair',
            'disconnected': 'offline'
        };
        return statusMap[status.toLowerCase()] || 'offline';
    }, []);

    // 모바일과 동일한 데이터 변환 함수
    const convertDeviceToAlarmData = useCallback((deviceData: DeviceAlertData): AlarmData => {
        const now = Date.now();

        // 메시지 우선순위: aiText > message > 기본 메시지 (모바일과 동일)
        const displayMessage = deviceData.aiText ||
            deviceData.message ||
            '디바이스 알림이 발생했습니다.';

        console.log('🎭 웹 데이터 변환:', {
            deviceId: deviceData.deviceId,
            originalStatus: deviceData.status,
            mappedStatus: mapDeviceStatusToCardState(deviceData.status),
            messageSource: deviceData.aiText ? 'aiText' :
                deviceData.message ? 'message' : 'default'
        });

        return {
            alarmId: `alarm-${deviceData.deviceId}-${now}`,
            regionName: deviceData.name || 'Unknown Device',
            regionLocation: deviceData.address || '위치 정보 없음',
            status: mapDeviceStatusToCardState(deviceData.status),
            type: 'machine' as const,
            createdAt: new Date(),
            message: displayMessage,
            model: deviceData.model || 'Unknown Model',
        };
    }, [mapDeviceStatusToCardState]);

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

                    // DeviceAlertData를 AlarmData로 변환 (모바일과 동일한 로직)
                    const alarmData = convertDeviceToAlarmData(deviceData);

                    console.log('🎭 웹 변환된 알람 데이터:', alarmData);

                    // 자동 닫기 제거 - 오직 새 모달만 표시 (모바일과 동일)
                    console.log('🎭 웹 새 모달 표시');
                    showAlert(alarmData);
                    lastAlertTimeRef.current = now;

                    // 브라우저 알림도 표시 (웹 전용 기능)
                    if (typeof window !== 'undefined' && Notification.permission === 'granted') {
                        new Notification(`Audix Alert - ${deviceData.name}`, {
                            body: alarmData.message,
                            icon: '/favicon.ico',
                            tag: `alert-${deviceData.deviceId}`, // 중복 알림 방지
                            requireInteraction: alarmData.type === 'safety' // 안전 알람은 사용자 상호작용 필요
                        });
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
        if (typeof window !== 'undefined' && Notification.permission === 'default') {
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
    }, [showAlert, checkConnectionStatus, convertDeviceToAlarmData, isModalVisible]);

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
            timeSinceLastAlert: Date.now() - lastAlertTimeRef.current,
            connectionDetails: webSocketClient.getDetailedConnectionStatus ?
                webSocketClient.getDetailedConnectionStatus() : null
        };
    }, [isConnected, isModalVisible, currentAlert]);

    // 테스트 알림 발송 (개발용)
    const sendTestAlert = useCallback(() => {
        console.log('🧪 테스트 알림 발송');
        if (webSocketClient.createTestAlert) {
            webSocketClient.createTestAlert();
        } else {
            console.warn('⚠️ createTestAlert 메서드가 없습니다');
        }
    }, []);

    // 알림 히스토리 관리 (웹 전용)
    const [alertHistory, setAlertHistory] = useState<AlarmData[]>([]);

    // 알림이 표시될 때 히스토리에 추가
    useEffect(() => {
        if (currentAlert) {
            setAlertHistory(prev => {
                // 중복 방지
                const exists = prev.some(alert => alert.alarmId === currentAlert.alarmId);
                if (exists) return prev;

                // 최대 50개까지만 유지
                return [currentAlert, ...prev.slice(0, 49)];
            });
        }
    }, [currentAlert]);

    // 히스토리에서 알림 제거
    const removeFromHistory = useCallback((alarmId: string) => {
        setAlertHistory(prev => prev.filter(alert => alert.alarmId !== alarmId));
    }, []);

    // 히스토리 전체 삭제
    const clearHistory = useCallback(() => {
        setAlertHistory([]);
    }, []);

    return {
        // 기본 상태 (모바일과 동일)
        currentAlert,
        isModalVisible,
        isConnected,

        // 모달 제어 (모바일과 동일)
        showAlert,
        hideAlert,

        // 연결 관리 (모바일과 동일)
        checkConnectionStatus,

        // 웹 전용 추가 기능
        reconnect,
        getConnectionDebugInfo,
        sendTestAlert,

        // 알림 히스토리 (웹 전용)
        alertHistory,
        removeFromHistory,
        clearHistory
    };
};