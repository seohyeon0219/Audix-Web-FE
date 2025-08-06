// 장비 타입 정의
export interface DeviceData {
    deviceId: number;
    areaId: number;
    name: string;
    deviceManager: string;
    parts: object; // 부품 목록
    normalScore: number; // 정상도
    image?: string;
}

