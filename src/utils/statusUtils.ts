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
    SAFE: {
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

// 상태 (숫자값: 0.1~1.0)을 받아서 상태별 스타일을 반환하는 함수
const getStatusColorFromValue = (value: number) => {
    if (value >= 0.1 && value < 0.3) {
        return STATUS_STYLES.DANGER;
    }
    if (value >= 0.3 && value < 0.6) {
        return STATUS_STYLES.WARNING;
    }
    if (value >= 0.6 && value <= 1.0) {
        return STATUS_STYLES.SAFE;
    }
    return STATUS_STYLES.OFFLINE;
}

// 장비 배열에서 가장 낮은 value를 기준으로 구역 상태 결정
const getStatusFromMachines = (machines: { value: number }[]) => {
    if (!machines || machines.length === 0) {
        return STATUS_STYLES.OFFLINE;
    }

    // 모든 장비의 value 중에서 최소값 찾기
    const lowestValue = Math.min(...machines.map(machine => machine.value))
    return getStatusColorFromValue(lowestValue);
}


export default getStatusColorFromValue;
export { getStatusFromMachines };