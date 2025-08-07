// 장비 위치 정보
export interface DevicePosition {
    deviceId: number;
    x: number;
    y: number;
}

// 컨베이어 벨트 정보
export interface AreaLayout {
    areaId: number;
    devices: DevicePosition[];
    conveyors?: Array<{ points: number[] }>;
}

