// 구역 타입 정의
export interface AreaData {
    id: string;
    name: string;
    // location: string;
    manager: string;
    machines: MachineData[];
}

// 장비 타입 정의
export interface MachineData {
    id: string;
    name: string;
    model: string;
    location: string;
    manager: string;
    parts: string[]; // 부품 목록
    value: number; // 정상도
}

