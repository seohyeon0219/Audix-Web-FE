// 상태 스타일을 상수로 정의
export const STATUS_STYLES = {
    DANGER: {
        bgColor: 'bg-danger',
        textColor: 'text-danger',
        hexColor: '#FF2F16',
        label: '위험',
        status: 'danger',
        priority: 1
    },
    WARNING: {
        bgColor: 'bg-warning',
        textColor: 'text-warning',
        hexColor: '#FFC525',
        label: '점검요망',
        status: 'warning',
        priority: 2
    },
    NORMAL: {
        bgColor: 'bg-normal',
        textColor: 'text-normal',
        hexColor: '#1CAA00',
        label: '안전',
        status: 'normal',
        priority: 3
    },
    REPAIR: {
        bgColor: 'bg-repair',
        textColor: 'text-repair',
        hexColor: '#898989',
        label: '수리중',
        status: 'repair',
        priority: 4
    },
    OFFLINE: {
        bgColor: 'bg-offline',
        textColor: 'text-offline',
        hexColor: '#515151',
        label: '미연결',
        status: 'offline',
        priority: 5
    },
}