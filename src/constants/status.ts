// 상태 결정 함수
export const getStatusFromValue = (value: number): 'danger' | 'warning' | 'safe' => {
    if (value >= 0.0 && value <= 0.3) 
        return 'danger';
    if (value >= 0.4 && value <= 0.7) 
        return 'warning';
    if (value >= 0.8 && value <= 1.0) 
        return 'safe';
    return 'safe';
}

// 상태별 색상
export const getStatusColor = (status: 'danger' | 'warning' | 'safe'): string => {
    switch (status) {
        case 'danger': 
            return 'bg-danger';
        case 'warning': 
            return 'bg-warning';
        case 'safe': 
            return 'bg-safe';
    }
};

