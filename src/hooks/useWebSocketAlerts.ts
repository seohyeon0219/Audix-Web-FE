// src/hooks/useWebSocketAlerts.ts
import { useState, useEffect, useRef, useCallback } from 'react';
import {
    webSocketClient,
    DeviceAlertData,
    AlarmData,
    convertToAlarmData
} from '@/utils/websocket/client';

export const useWebSocketAlerts = () => {
    const [currentAlert, setCurrentAlert] = useState<AlarmData | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const lastAlertTimeRef = useRef(0);
    const alertThrottleMs = 1000; // 1초 간격 제한

    // 모달 표시
    const showAlert = useCallback((alarmData: AlarmData) => {
        console.log('🎭 웹 모달 표시:', {
            alarmId: alarmData.alarmId,
            regionName: alarmData.regionName,
            status: alarmData.status
        });

        setCurrentAlert(alarmData);
        setIsModalVisible(true);
    }, []);

    // 모달 닫기
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

    // WebSocket 초기화 및 알림 처리
    useEffect(() => {
        console.log('🚀 WebSocket 알림 시스템 초기화');

        // WebSocket 연결
        webSocketClient.connect();

        // 연결 상태 주기적 확인
        const connectionInterval = setInterval(checkConnectionStatus, 5000);

        // 알림 콜백 설정
        webSocketClient.setOnAlert((deviceData: DeviceAlertData) => {
            const now = Date.now();

            // 쓰로틀링: 너무 빠른 연속 알림 방지
            if (now - lastAlertTimeRef.current < alertThrottleMs) {
                console.log('🚫 웹 알림 스킵 (쓰로틀링:', now - lastAlertTimeRef.current, 'ms)');
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

            // DeviceAlertData를 AlarmData로 변환
            const alarmData = convertToAlarmData(deviceData);

            console.log('🎭 웹 변환된 알람 데이터:', {
                ...alarmData,
                messageSource: deviceData.aiText ? 'aiText' :
                    deviceData.message ? 'message' : 'default'
            });

            // 알림 표시 및 시간 업데이트
            showAlert(alarmData);
            lastAlertTimeRef.current = now;
        });

        // 초기 연결 상태 확인
        setTimeout(checkConnectionStatus, 1000);

        // 정리 함수
        return () => {
            console.log('🔌 WebSocket 정리');
            clearInterval(connectionInterval);
            webSocketClient.disconnect();
        };
    }, [showAlert, checkConnectionStatus]);

    return {
        currentAlert,
        isModalVisible,
        isConnected,
        showAlert,
        hideAlert,
        checkConnectionStatus
    };
};