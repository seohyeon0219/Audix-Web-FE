// 상태별 색상 정의
export const STATUS_COLORS = {
    safe: "#1CAA00", // 초록 (안전)
    warning: "#FFC525", // 노랑 (점검요망)
    danger: "#FF2F16", // 빨강 (위험)
    offline: "#515151", // 연한 회색 (수리 중)
    repair: "#898989" // 진한 회색 (마이크 미연결)
} as const;

export type StatusType = 'safe' | 'warning' | 'danger' | 'offline' | 'repair';

// 수치 기반 상태 판별 함수
export const getStatusFromValue = (value: number): StatusType => {
    if (value >= 0 && value < 0.3) {
        return 'danger';
    } else if (value >= 0.3 && value < 0.7) {
        return 'warning';
    } else if (value >= 0.7 && value <= 1.0) {
        return 'safe';
    } else {
        return 'offline';
    }
}

// 상태별 라벨
export const STATUS_LABELS = {
    safe: "안전",
    warning: "점검 요망",
    danger: "위험",
    offline: "마이크 미연결",
    repair: "수리중"
} as const;

export const getStatusColor = (status: StatusType) =>  {
    return STATUS_COLORS[status];
};