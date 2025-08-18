'use client';

import React, { useState, useEffect } from 'react';
import { webSocketClient, DeviceAlertData } from './client';

interface AlertHistoryItem extends DeviceAlertData {
    id: string;
}

/**
 * WebSocketManager - 웹용 WebSocket 알림 관리자
 * 앱과 동일한 방식으로 알림을 처리하지만 웹 환경에 맞게 구현
 */
const WebSocketManager: React.FC = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [alertHistory, setAlertHistory] = useState<AlertHistoryItem[]>([]);
    const [showAlerts, setShowAlerts] = useState(false);

    // WebSocket 초기화 및 연결 상태 관리
    useEffect(() => {
        const initializeWebSocket = async () => {
            try {
                await webSocketClient.connect();

                // 알림 콜백 설정
                webSocketClient.setOnAlert((data: DeviceAlertData) => {
                    console.log('🔔 웹 알림 수신:', data);

                    const alertWithId: AlertHistoryItem = {
                        ...data,
                        id: `${data.deviceId}-${Date.now()}`,
                    };

                    setAlertHistory(prev => [alertWithId, ...prev.slice(0, 9)]); // 최대 10개 유지
                    setShowAlerts(true); // 새 알림이 오면 자동으로 표시

                    // 브라우저 알림 표시 (권한이 있을 때만)
                    if (Notification.permission === 'granted') {
                        new Notification(`Audix Alert - ${data.name}`, {
                            body: data.message,
                            icon: '/favicon.ico'
                        });
                    }
                });

                setIsConnected(webSocketClient.getConnectionStatus());
            } catch (error) {
                console.error('WebSocket 초기화 실패:', error);
                setIsConnected(false);
            }
        };

        initializeWebSocket();

        // 연결 상태 체크 인터벌
        const statusInterval = setInterval(() => {
            setIsConnected(webSocketClient.getConnectionStatus());
        }, 1000);

        // 브라우저 알림 권한 요청
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }

        return () => {
            clearInterval(statusInterval);
            webSocketClient.disconnect();
        };
    }, []);

    // 상태별 색상 반환
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'danger': return '#EF4444';
            case 'warning': return '#F59E0B';
            case 'normal': return '#10B981';
            case 'repair': return '#6B7280';
            case 'offline': return '#9CA3AF';
            default: return '#6B7280';
        }
    };

    // 상태별 라벨 반환
    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'danger': return '위험';
            case 'warning': return '점검 요망';
            case 'normal': return '정상';
            case 'repair': return '점검 중';
            case 'offline': return '미연결';
            default: return '알 수 없음';
        }
    };

    // 상대 시간 계산
    const getRelativeTime = (timestamp: string) => {
        try {
            const now = new Date();
            const alertTime = new Date(timestamp);
            const diffMs = now.getTime() - alertTime.getTime();
            const diffMinutes = Math.floor(diffMs / (1000 * 60));

            if (diffMinutes < 1) return '방금 전';
            if (diffMinutes < 60) return `${diffMinutes}분 전`;
            if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}시간 전`;
            return `${Math.floor(diffMinutes / 1440)}일 전`;
        } catch {
            return '시간 정보 없음';
        }
    };

    // 테스트 알림 발송
    const handleSendTest = (status: string) => {
        webSocketClient.createTestAlert();
    };

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            maxWidth: '400px',
        }}>
            {/* WebSocket 상태 표시 */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#ffffff',
                padding: '12px 16px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                marginBottom: '10px',
            }}>
                <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: isConnected ? '#10B981' : '#EF4444',
                }} />
                <span style={{ fontSize: '14px', fontWeight: '500' }}>
                    WebSocket: {isConnected ? '연결됨' : '연결 끊어짐'}
                </span>

                {/* 알림 토글 버튼 */}
                <button
                    onClick={() => setShowAlerts(!showAlerts)}
                    style={{
                        marginLeft: 'auto',
                        padding: '4px 8px',
                        fontSize: '12px',
                        backgroundColor: '#3B82F6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    알림 {showAlerts ? '숨기기' : '보기'} ({alertHistory.length})
                </button>
            </div>

            {/* 테스트 버튼 */}
            <div style={{
                display: 'flex',
                gap: '5px',
                marginBottom: '10px',
            }}>
                <button
                    onClick={() => handleSendTest('danger')}
                    style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        backgroundColor: '#EF4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    테스트 알림
                </button>
                <button
                    onClick={() => setAlertHistory([])}
                    style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        backgroundColor: '#6B7280',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    모든 알림 삭제
                </button>
            </div>

            {/* 알림 히스토리 */}
            {showAlerts && (
                <div style={{
                    maxHeight: '500px',
                    overflowY: 'auto',
                    backgroundColor: '#F9FAFB',
                    borderRadius: '8px',
                    padding: '10px',
                    border: '1px solid #E5E7EB',
                }}>
                    <h4 style={{
                        margin: '0 0 10px 0',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#1F2937',
                    }}>
                        실시간 알림 히스토리
                    </h4>

                    {alertHistory.length === 0 ? (
                        <p style={{
                            margin: 0,
                            fontSize: '14px',
                            color: '#6B7280',
                            textAlign: 'center',
                            padding: '20px',
                        }}>
                            아직 받은 알림이 없습니다
                        </p>
                    ) : (
                        alertHistory.map((alert) => (
                            <div
                                key={alert.id}
                                onClick={() => console.log('알림 클릭:', alert)}
                                style={{
                                    border: `2px solid ${getStatusColor(alert.status)}`,
                                    borderRadius: '8px',
                                    padding: '12px',
                                    margin: '8px 0',
                                    backgroundColor: '#ffffff',
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{
                                            margin: 0,
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            color: '#1F2937',
                                            marginBottom: '4px',
                                        }}>
                                            {getStatusLabel(alert.status)}
                                        </h3>
                                        <p style={{
                                            margin: 0,
                                            fontSize: '14px',
                                            color: '#6B7280',
                                            marginBottom: '2px',
                                        }}>
                                            {alert.name} (ID: {alert.deviceId})
                                        </p>
                                        <p style={{
                                            margin: 0,
                                            fontSize: '14px',
                                            color: '#374151',
                                            marginBottom: '4px',
                                        }}>
                                            {alert.address}
                                        </p>
                                        <p style={{
                                            margin: 0,
                                            fontSize: '13px',
                                            color: '#4B5563',
                                        }}>
                                            {alert.message}
                                        </p>
                                        <p style={{
                                            margin: 0,
                                            fontSize: '12px',
                                            color: '#9CA3AF',
                                            marginTop: '4px',
                                        }}>
                                            점수: {alert.normalScore.toFixed(2)}
                                        </p>
                                    </div>
                                    <span style={{
                                        fontSize: '12px',
                                        color: '#9CA3AF',
                                        whiteSpace: 'nowrap',
                                        marginLeft: '16px',
                                    }}>
                                        {getRelativeTime(alert.timestamp)}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default WebSocketManager;
