// deviceType
export interface DeviceData {
    areaId: number;
    deviceId: number;
    name: string;
    model: string;
    address: string;
    deviceManager: string;
    parts?: object; // 부품 목록
    normalScore?: number; // 정상도
    image?: string;
    status: string;
    aiText: string;
}
