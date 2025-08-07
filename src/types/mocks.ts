// alarmDataType
export type AlarmDataType = 'danger' | 'warning';

export interface AlarmDataCount {
    danger: number;
    warning: number;
}

// areaType
export interface AreaData {
    id: number;
    name: string; // 3공장 프레스 구역
    address: string; // 울산 현대자동차 31라인
    status: string;
}

// deviceType
export interface DeviceData {
    areaId: number;
    deviceId: number;
    name: string;
    model: string;
    deviceManager: string;
    parts?: object; // 부품 목록
    normalScore?: number; // 정상도
    image?: string;
    status: string;
}

// recentDashboardType
export interface RecentDashboardData {
    date: string;
    status: string; 
}

