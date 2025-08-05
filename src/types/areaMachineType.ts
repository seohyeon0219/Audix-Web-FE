// 구역 타입 정의
export interface AreaData {
    id: number;
    name: string; // 3공장 프레스 구역
    address: string; // 울산 현대자동차 31라인
    status: string;
}

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

// 구역 카드 props 타입 정의
export interface AreaCardProps {
    data: AreaData;
    index: number;
    onClick?: (areaId: string) => void;
}

