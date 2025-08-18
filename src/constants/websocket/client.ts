// src/utils/websocket/client.ts
import { io, Socket } from 'socket.io-client';

export interface DeviceAlertData {
    deviceId: number;
    areaId?: number;
    name: string;
    model: string;
    address: string;
    deviceManager: string;
    parts: any;
    normalScore: number;
    image: string;
    status: string;
    aiText: string;
    message: string;
    timestamp: string;
}

export interface AlarmData {
    alarmId: string;
    regionName: string;
    regionLocation: string;
    status: 'danger' | 'warning' | 'normal' | 'repair' | 'offline';
    type: 'machine' | 'safety';
    createdAt: Date;
    message: string;
    model: string;
}

class WebSocketClient {
    private socket: Socket | null = null;
    private onAlertCallback?: (data: DeviceAlertData) => void;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectInterval = 5000;

    connect() {
        if (this.socket?.connected) {
            console.log('🔌 이미 연결됨');
            return;
        }

        console.log('🔌 Socket.IO 연결 중...');

        this.socket = io('http://165.246.116.18:3000', {
            transports: ['polling', 'websocket'],
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: this.maxReconnectAttempts,
            reconnectionDelay: this.reconnectInterval,
        });

        this.socket.on('connect', () => {
            console.log('✅ Socket.IO 연결 성공');
            this.reconnectAttempts = 0;
            this.setupListener();
        });

        this.socket.on('connect_error', (error) => {
            console.error('❌ 연결 실패:', error.message);
            this.reconnectAttempts++;
        });

        this.socket.on('disconnect', (reason) => {
            console.log('🔌 연결 해제:', reason);
        });

        this.socket.on('reconnect', (attemptNumber) => {
            console.log('🔄 재연결 성공:', attemptNumber);
        });

        this.socket.on('reconnect_error', (error) => {
            console.error('❌ 재연결 실패:', error.message);
        });
    }

    private setupListener() {
        if (!this.socket) return;

        this.socket.on('device-alert', (data: DeviceAlertData) => {
            console.log('📡 알림 수신:', data.name);
            if (this.onAlertCallback) {
                this.onAlertCallback(data);
            }
        });
    }

    setOnAlert(callback: (data: DeviceAlertData) => void) {
        this.onAlertCallback = callback;
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    isConnected(): boolean {
        return this.socket?.connected || false;
    }
}

// 싱글톤 인스턴스
export const webSocketClient = new WebSocketClient();

// 상태 매핑 함수
export const mapDeviceStatusToCardState = (status: string): AlarmData['status'] => {
    const statusLowerCase = status.toLowerCase();

    switch (statusLowerCase) {
        case 'danger':
        case 'critical':
        case 'error':
            return 'danger';
        case 'warning':
        case 'caution':
            return 'warning';
        case 'normal':
        case 'ok':
        case 'good':
            return 'normal';
        case 'repair':
        case 'maintenance':
        case 'fixing':
            return 'repair';
        case 'offline':
        case 'disconnected':
        case 'mic_issue':
            return 'offline';
        default:
            return 'warning';
    }
};

// DeviceAlertData를 AlarmData로 변환
export const convertToAlarmData = (deviceData: DeviceAlertData): AlarmData => {
    const displayMessage = deviceData.aiText ||
        deviceData.message ||
        '디바이스 알림이 발생했습니다.';

    return {
        alarmId: `alarm-${deviceData.deviceId}-${Date.now()}`,
        regionName: deviceData.name || 'Unknown Device',
        regionLocation: deviceData.address || '위치 정보 없음',
        status: mapDeviceStatusToCardState(deviceData.status),
        type: 'machine' as const,
        createdAt: new Date(),
        message: displayMessage,
        model: deviceData.model || 'Unknown Model',
    };
};