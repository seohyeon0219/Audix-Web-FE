// src/constants/websocket/client.ts
import { io, Socket } from 'socket.io-client';

// 모바일과 동일한 인터페이스
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

// 모바일과 동일한 인터페이스
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
    private connectionAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 1000; // 시작 지연시간 (ms)
    private isManuallyDisconnected = false;

    constructor() {
        // 브라우저 환경에서만 실행
        if (typeof window !== 'undefined') {
            // 페이지 언로드 시 정리
            window.addEventListener('beforeunload', () => {
                this.disconnect();
            });
        }
    }

    connect() {
        if (this.socket?.connected) {
            console.log('🔌 이미 WebSocket에 연결되어 있습니다');
            return;
        }

        console.log('🚀 웹 WebSocket 연결 시도...', {
            attempt: this.connectionAttempts + 1,
            maxAttempts: this.maxReconnectAttempts
        });

        this.isManuallyDisconnected = false;

        // Socket.IO 클라이언트 생성
        this.socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'http://localhost:3000', {
            transports: ['websocket', 'polling'], // 폴링 백업 추가
            timeout: 20000,
            autoConnect: true,
            reconnection: true,
            reconnectionDelay: this.reconnectDelay,
            reconnectionAttempts: this.maxReconnectAttempts,
        });

        // 연결 이벤트 핸들러
        this.socket.on('connect', () => {
            console.log('✅ 웹 WebSocket 연결 성공:', this.socket?.id);
            this.connectionAttempts = 0; // 성공 시 카운터 리셋
        });

        // 연결 해제 이벤트 핸들러  
        this.socket.on('disconnect', (reason) => {
            console.log('🔌 웹 WebSocket 연결 해제:', reason);

            // 수동 연결 해제가 아닌 경우 재연결 시도
            if (!this.isManuallyDisconnected && reason !== 'io client disconnect') {
                this.handleReconnection();
            }
        });

        // 연결 오류 이벤트 핸들러
        this.socket.on('connect_error', (error) => {
            console.error('❌ 웹 WebSocket 연결 오류:', error);
            this.handleReconnection();
        });

        // 디바이스 알림 이벤트 핸들러 (모바일과 동일한 이벤트명)
        this.socket.on('device-alert', (data: DeviceAlertData) => {
            console.log('📨 웹 WebSocket 알림 수신:', {
                deviceId: data.deviceId,
                name: data.name,
                status: data.status,
                message: data.message || data.aiText
            });

            if (this.onAlertCallback) {
                this.onAlertCallback(data);
            }
        });

        // 일반 메시지 이벤트 핸들러
        this.socket.on('message', (data) => {
            console.log('💬 웹 WebSocket 메시지:', data);
        });

        // 커스텀 이벤트 핸들러들
        this.socket.on('server-status', (data) => {
            console.log('📊 서버 상태:', data);
        });
    }

    private handleReconnection() {
        if (this.connectionAttempts < this.maxReconnectAttempts && !this.isManuallyDisconnected) {
            this.connectionAttempts++;
            const delay = this.reconnectDelay * Math.pow(2, this.connectionAttempts - 1); // 지수 백오프

            console.log(`🔄 웹 WebSocket 재연결 시도 (${this.connectionAttempts}/${this.maxReconnectAttempts}) ${delay}ms 후...`);

            setTimeout(() => {
                if (!this.isManuallyDisconnected) {
                    this.connect();
                }
            }, delay);
        } else {
            console.error('❌ 웹 WebSocket 최대 재연결 시도 횟수 초과 또는 수동 연결 해제');
        }
    }

    disconnect() {
        console.log('🔌 웹 WebSocket 연결 해제 요청');
        this.isManuallyDisconnected = true;

        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }

        this.connectionAttempts = 0;
    }

    // 알림 콜백 설정 (모바일과 동일한 인터페이스)
    setOnAlert(callback: (data: DeviceAlertData) => void) {
        this.onAlertCallback = callback;
        console.log('🎯 웹 알림 콜백 설정 완료');
    }

    // 연결 상태 확인 (모바일과 동일한 인터페이스)
    isConnected(): boolean {
        return this.socket?.connected || false;
    }

    // 연결 상태 상세 정보 (웹 전용 추가 기능)
    getConnectionStatus() {
        return {
            connected: this.isConnected(),
            socketId: this.socket?.id || null,
            connectionAttempts: this.connectionAttempts,
            isManuallyDisconnected: this.isManuallyDisconnected,
            transport: this.socket?.io.engine?.transport?.name || null
        };
    }

    // 메시지 전송 (테스트용)
    sendMessage(event: string, data: any) {
        if (this.socket?.connected) {
            this.socket.emit(event, data);
            console.log(`📤 웹 WebSocket 메시지 전송 [${event}]:`, data);
        } else {
            console.warn('⚠️ WebSocket이 연결되지 않아 메시지를 전송할 수 없습니다');
        }
    }

    // 서버 핑 테스트 (웹 전용 디버깅 기능)
    ping(): Promise<number> {
        return new Promise((resolve, reject) => {
            if (!this.socket?.connected) {
                reject(new Error('WebSocket이 연결되지 않았습니다'));
                return;
            }

            const startTime = Date.now();

            this.socket.emit('ping', startTime, (response: number) => {
                const latency = Date.now() - startTime;
                console.log(`🏓 웹 WebSocket 핑: ${latency}ms`);
                resolve(latency);
            });

            // 5초 타임아웃
            setTimeout(() => {
                reject(new Error('핑 타임아웃'));
            }, 5000);
        });
    }
}

// 싱글톤 인스턴스 생성 (모바일과 동일)
export const webSocketClient = new WebSocketClient();

// 모바일과 동일한 데이터 변환 함수
export const convertToAlarmData = (deviceData: DeviceAlertData): AlarmData => {
    // 상태 매핑 (모바일과 동일)
    const mapDeviceStatusToCardState = (status: string): AlarmData['status'] => {
        const statusMap: Record<string, AlarmData['status']> = {
            'danger': 'danger',
            'warning': 'warning',
            'normal': 'normal',
            'repair': 'repair',
            'offline': 'offline',
            // 추가 매핑
            'error': 'danger',
            'alert': 'warning',
            'ok': 'normal',
            'maintenance': 'repair',
            'disconnected': 'offline'
        };
        return statusMap[status.toLowerCase()] || 'offline';
    };

    // 메시지 우선순위 (모바일과 동일)
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

// 기본 export (모바일과 동일)
export default webSocketClient;