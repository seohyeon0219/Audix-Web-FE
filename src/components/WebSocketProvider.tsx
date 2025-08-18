'use client';

// src/components/WebSocketProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useWebSocketAlerts } from '@/hooks/useWebSocketAlerts';
import NotificationModal from '@/components/common/NotificationModal';
import { AlarmData } from '@/constants/websocket/client';

interface WebSocketContextType {
    isConnected: boolean;
    currentAlert: AlarmData | null;
    reconnect: () => void;
    getConnectionDebugInfo: () => any;
}

const WebSocketContext = createContext<WebSocketContextType>({
    isConnected: false,
    currentAlert: null,
    reconnect: () => { },
    getConnectionDebugInfo: () => ({})
});

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};

interface WebSocketProviderProps {
    children: React.ReactNode;
    showConnectionStatus?: boolean; // 연결 상태 표시 여부
    enableBrowserNotifications?: boolean; // 브라우저 알림 활성화 여부
}

/**
 * WebSocketProvider - 웹용 WebSocket 알림 관리자
 * 모바일 앱과 동일한 방식으로 알림을 처리하지만 웹 환경에 맞게 구현
 */
export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
    children,
    showConnectionStatus = false,
    enableBrowserNotifications = true
}) => {
    const {
        currentAlert,
        isModalVisible,
        isConnected,
        hideAlert,
        reconnect,
        getConnectionDebugInfo
    } = useWebSocketAlerts();

    const [showDebugPanel, setShowDebugPanel] = useState(false);

    // 개발 환경에서 디버그 패널 토글 (Ctrl+Shift+D)
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.shiftKey && event.key === 'D') {
                setShowDebugPanel(prev => !prev);
            }
        };

        if (process.env.NODE_ENV === 'development') {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // 연결 상태 표시 컴포넌트
    const ConnectionStatus = () => {
        if (!showConnectionStatus && process.env.NODE_ENV !== 'development') return null;

        return (
            <div
                className={`fixed top-4 right-4 z-40 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isConnected
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-red-100 text-red-800 border border-red-200'
                    }`}
            >
                <div className="flex items-center gap-2">
                    <div
                        className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'
                            }`}
                    />
                    <span>
                        {isConnected ? 'WebSocket 연결됨' : 'WebSocket 연결 끊김'}
                    </span>
                    {!isConnected && (
                        <button
                            onClick={reconnect}
                            className="ml-2 px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
                        >
                            재연결
                        </button>
                    )}
                </div>
            </div>
        );
    };

    // 개발자 디버그 패널
    const DebugPanel = () => {
        if (!showDebugPanel || process.env.NODE_ENV !== 'development') return null;

        const debugInfo = getConnectionDebugInfo();

        return (
            <div className="fixed bottom-4 left-4 z-40 bg-black bg-opacity-90 text-white p-4 rounded-lg max-w-md">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold">WebSocket Debug</h3>
                    <button
                        onClick={() => setShowDebugPanel(false)}
                        className="text-gray-400 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-1 text-sm font-mono">
                    <div>연결 상태: {debugInfo.isConnected ? '✅' : '❌'}</div>
                    <div>모달 표시: {debugInfo.modalVisible ? '✅' : '❌'}</div>
                    <div>현재 알람: {debugInfo.currentAlert || 'None'}</div>
                    <div>마지막 알람: {debugInfo.lastAlertTime ? new Date(debugInfo.lastAlertTime).toLocaleTimeString() : 'None'}</div>
                    <div>경과 시간: {debugInfo.timeSinceLastAlert}ms</div>
                </div>

                <div className="mt-3 flex gap-2">
                    <button
                        onClick={reconnect}
                        className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                    >
                        재연결
                    </button>
                    <button
                        onClick={() => console.log('WebSocket Debug Info:', debugInfo)}
                        className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                    >
                        콘솔 출력
                    </button>
                </div>

                <div className="mt-2 text-xs text-gray-400">
                    Ctrl+Shift+D로 토글
                </div>
            </div>
        );
    };

    const contextValue: WebSocketContextType = {
        isConnected,
        currentAlert,
        reconnect,
        getConnectionDebugInfo
    };

    return (
        <WebSocketContext.Provider value={contextValue}>
            {children}

            {/* 연결 상태 표시 */}
            <ConnectionStatus />

            {/* 개발자 디버그 패널 */}
            <DebugPanel />

            {/* 알림 모달 */}
            <NotificationModal
                isVisible={isModalVisible}
                data={currentAlert}
                onClose={hideAlert}
            />
        </WebSocketContext.Provider>
    );
};

// 사용 예시 컴포넌트
export const WebSocketDemo: React.FC = () => {
    const { isConnected, reconnect } = useWebSocket();

    return (
        <div className="p-4">
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">WebSocket 상태</h2>
                <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {isConnected ? '연결됨' : '연결 끊김'}
                    </div>
                    {!isConnected && (
                        <button
                            onClick={reconnect}
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            재연결 시도
                        </button>
                    )}
                </div>
            </div>

            {process.env.NODE_ENV === 'development' && (
                <div className="text-sm text-gray-600">
                    개발 모드에서 Ctrl+Shift+D를 눌러 디버그 패널을 열 수 있습니다.
                </div>
            )}
        </div>
    );
};

export default WebSocketProvider;