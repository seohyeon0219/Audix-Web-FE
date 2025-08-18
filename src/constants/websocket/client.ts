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

        // Socket.IO 클라이언트 생성 (모바일과 동일한 서버 주소)
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

            if (!this.isManuallyDisconnected) {
                this.connectionAttempts++;
                if (this.connectionAttempts < this.maxReconnectAttempts) {
                    const delay = Math.min(this.reconnectDelay * Math.pow(2, this.connectionAttempts), 30000);
                    console.log(`🔄 ${delay}ms 후 재연결 시도... (${this.connectionAttempts}/${this.maxReconnectAttempts})`);
                } else {
                    console.error('❌ 최대 재연결 시도 횟수 초과');
                }
            }
        });

        // 알림 이벤트 핸들러 (모바일과 동일)
        this.socket.on('device-alert', (data: DeviceAlertData) => {
            console.log('🔔 웹 알림 수신:', data);
            if (this.onAlertCallback) {
                this.onAlertCallback(data);
            }
        });

        // 에러 핸들러
        this.socket.on('connect_error', (error) => {
            console.error('🔴 웹 WebSocket 연결 에러:', error.message);
        });
    }

    disconnect() {
        this.isManuallyDisconnected = true;
        if (this.socket) {
            console.log('🔌 웹 WebSocket 연결 종료');
            this.socket.disconnect();
            this.socket = null;
        }
    }

    isConnected(): boolean {
        return this.socket?.connected || false;
    }

    setOnAlert(callback: (data: DeviceAlertData) => void) {
        this.onAlertCallback = callback;
    }

    // 테스트 알림 발송 (개발용)
    sendTestAlert() {
        if (!this.socket?.connected) {
            console.warn('⚠️ WebSocket이 연결되어 있지 않습니다');
            return;
        }

        const testAlert: DeviceAlertData = {
            deviceId: Math.floor(Math.random() * 1000),
            areaId: 1,
            name: 'Test Device',
            model: 'TEST-001',
            address: '테스트 위치',
            deviceManager: 'Test Manager',
            parts: {},
            normalScore: Math.random() * 100,
            image: '',
            status: 'warning',
            aiText: '',
            message: '이것은 테스트 알림입니다.',
            timestamp: new Date().toISOString()
        };

        this.socket.emit('test-alert', testAlert);
        console.log('📤 테스트 알림 전송:', testAlert);
    }

    // 알림 제거 (테스트용)
    removeAlarm(timestamp: string) {
        if (this.socket?.connected) {
            this.socket.emit('remove-alarm', { timestamp });
            console.log('🗑️ 알림 제거 요청:', timestamp);
        }
    }

    // 모든 알림 제거 (테스트용)
    clearAllAlarms() {
        if (this.socket?.connected) {
            this.socket.emit('clear-alarms');
            console.log('🗑️ 모든 알림 제거 요청');
        }
    }
}

// 싱글톤 인스턴스 생성 (모바일과 동일)
export const webSocketClient = new WebSocketClient();

// 모바일과 동일한 데이터 변환 함수 - Safety 타입 판별 로직 추가
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

    // 메시지 내용으로 safety 타입 판별 (모바일과 동일한 로직)
    const determineAlarmType = (): AlarmData['type'] => {
        const combinedMessage = `${deviceData.message || ''} ${deviceData.aiText || ''}`.toLowerCase();

        // safety 타입으로 분류할 키워드들
        const safetyKeywords = [
            '비명',
            '도움',
            '살려',
            '구조',
            '화재',
            '불',
            '폭발',
            '사고',
            '부상',
            '응급'
        ];

        // 키워드가 포함되어 있으면 safety 타입으로 분류
        const isSafety = safetyKeywords.some(keyword => combinedMessage.includes(keyword));

        return isSafety ? 'safety' : 'machine';
    };

    // 최종 메시지 결정 (safety 타입일 경우 특별 처리)
    const getFinalMessage = (): string => {
        const combinedMessage = `${deviceData.message || ''} ${deviceData.aiText || ''}`;

        // "비명" 키워드가 있으면 특별 메시지
        if (combinedMessage.includes('비명')) {
            return '비명 소리가 감지되었습니다.\n즉시 현장 확인이 필요합니다.';
        }

        // 다른 안전 관련 키워드들에 대한 메시지
        if (combinedMessage.includes('화재') || combinedMessage.includes('불')) {
            return '화재 경보가 감지되었습니다.\n즉시 대피 및 확인이 필요합니다.';
        }

        if (combinedMessage.includes('사고') || combinedMessage.includes('부상')) {
            return '안전 사고가 발생했을 가능성이 있습니다.\n즉시 확인이 필요합니다.';
        }

        // 기존 메시지 로직 유지
        return deviceData.aiText || deviceData.message || '디바이스 알림이 발생했습니다.';
    };

    const alarmType = determineAlarmType();

    return {
        alarmId: `alarm-${deviceData.deviceId}-${Date.now()}`,
        regionName: deviceData.name || 'Unknown Device',
        regionLocation: deviceData.address || '위치 정보 없음',
        status: mapDeviceStatusToCardState(deviceData.status),
        type: alarmType,
        createdAt: new Date(),
        message: getFinalMessage(),
        model: deviceData.model || 'Unknown Model',
    };
};

// 기본 export (모바일과 동일)
export default webSocketClient;