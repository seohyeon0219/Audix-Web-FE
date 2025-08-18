'use client';

import { useState, useEffect, useCallback } from 'react';
import { webSocketClient, DeviceAlertData } from './client';

export function useWebSocket() {
    const [isConnected, setIsConnected] = useState(false);
    const [lastAlert, setLastAlert] = useState<DeviceAlertData | null>(null);
    const [alarmHistory, setAlarmHistory] = useState<DeviceAlertData[]>([]);

    // WebSocket 초기화 및 연결 상태 관리
    useEffect(() => {
        const initializeWebSocket = async () => {
            try {
                await webSocketClient.connect();

                // 알림 콜백 설정
                webSocketClient.setOnAlert((data: DeviceAlertData) => {
                    console.log('📡 웹에서 알림 수신:', data);
                    setLastAlert(data);
                    setAlarmHistory(prev => [data, ...prev.slice(0, 49)]); // 최대 50개 유지
                });

                setIsConnected(webSocketClient.getConnectionStatus());
            } catch (error) {
                console.error('WebSocket 연결 실패:', error);
                setIsConnected(false);
            }
        };

        initializeWebSocket();

        // 연결 상태 확인 인터벌
        const statusInterval = setInterval(() => {
            setIsConnected(webSocketClient.getConnectionStatus());
        }, 1000);

        // 클린업
        return () => {
            clearInterval(statusInterval);
            webSocketClient.disconnect();
        };
    }, []);

    // 테스트용 알림 발송 함수
    const sendTestAlert = useCallback(() => {
        webSocketClient.createTestAlert();
    }, []);

    // 알림 제거
    const removeAlarm = useCallback((timestamp: string) => {
        webSocketClient.removeAlarm(timestamp);
        setAlarmHistory(prev => prev.filter(alert => alert.timestamp !== timestamp));
    }, []);

    // 모든 알림 제거
    const clearAllAlarms = useCallback(() => {
        webSocketClient.clearAllAlarms();
        setAlarmHistory([]);
    }, []);

    return {
        isConnected,
        lastAlert,
        alarmHistory,
        sendTestAlert,
        removeAlarm,
        clearAllAlarms,
    };
}
