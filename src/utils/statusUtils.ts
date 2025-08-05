// 상태 스타일을 상수로 정의
export const STATUS_STYLES = {
    DANGER: {
        bgColor: 'bg-danger',
        textColor: 'text-danger',
        label: '위험',
        priority: 1
    },
    WARNING: {
        bgColor: 'bg-warning',
        textColor: 'text-warning',
        label: '점검요망',
        priority: 2
    },
    NORMAL: {
        bgColor: 'bg-safe',
        textColor: 'text-safe',
        label: '안전',
        priority: 3
    },
    OFFLINE: {
        bgColor: 'bg-danger',
        textColor: 'text-danger',
        label: '위험',
        priority: 4
    },

}

// 1. normalScore를 받아서 상태별 스타일을 반환하는 함수
export const getStatusColorFromValue = (normalScore: number) => {
    if (normalScore >= 0.1 && normalScore < 0.3) {
        return STATUS_STYLES.DANGER;
    }
    if (normalScore >= 0.3 && normalScore < 0.6) {
        return STATUS_STYLES.WARNING;
    }
    if (normalScore >= 0.6 && normalScore <= 1.0) {
        return STATUS_STYLES.NORMAL;
    }
    return STATUS_STYLES.OFFLINE;
}

// 2. normalScore를 받아서 상태 문자열 반환
export const getStatusStringFromScore = (normalScore: number): 'normal' | 'warning' | 'danger' | 'offline' | 'repair' => {
    if (normalScore >= 0.1 && normalScore < 0.3) {
        return 'danger';
    }
    if (normalScore >= 0.3 && normalScore < 0.6) {
        return 'warning';
    }
    if (normalScore >= 0.6 && normalScore <= 1.0) {
        return 'normal';
    }
    return 'offline';
}

// 3. 상태 문자열로 상태 스타일 반환
export const getStatusFromString = (status: 'normal' | 'warning' | 'danger' | 'offline' | 'repair') => {
    switch (status) {
        case 'normal':
            return STATUS_STYLES.NORMAL;
        case 'warning':
            return STATUS_STYLES.WARNING;
        case 'danger':
            return STATUS_STYLES.DANGER;
        case 'offline':
        default:
            return STATUS_STYLES.OFFLINE;
    }
}