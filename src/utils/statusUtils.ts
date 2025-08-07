import { AiTextResult } from '@/types/deviceMonitoring';
import { MockAreaData } from "@/mocks";


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

// 구역, 장비의 status를 받아서 상태 스타일을 반환하는 함수
export const getStatusStyleFromString = (status: string) => {
    switch (status) {
        case 'danger':
            return STATUS_STYLES.DANGER;
        case 'warning':
            return STATUS_STYLES.WARNING;
        case 'normal':
            return STATUS_STYLES.NORMAL;
        case 'repair':
            return STATUS_STYLES.REPAIR;
        case 'offline':
            return STATUS_STYLES.OFFLINE;
        default:
            return STATUS_STYLES.NORMAL;
    }
}

// 상태 별 아이콘 설정
export const getStatusStyle = (status: AiTextResult['status']): { icon: string } => {
    switch(status) {
        case 'danger':
            return {
                icon: '🚨'
            };
        case 'warning':
            return {
                icon: '⚠️'
            };
        case 'normal':
            return {
                icon: '✅'
            };
        case 'offline' :
            return {
                icon: '🔌'
            };
        case 'repair' :
            return {
                icon: '❓'
            };
        default:
            return {
                icon: '❓'
            };
    }
}

// 상태별 정렬
export const sortedAreas = [...MockAreaData].sort((a, b) => {
    const statusA = a.status || 'offline';
    const statusB = b.status || 'offline';

    // STATUS_STYLES에서 priority 찾기
    const priorityA = Object.values(STATUS_STYLES).find(style => style.status === statusA)?.priority || 999;
    const priorityB = Object.values(STATUS_STYLES).find(style => style.status === statusB)?.priority || 999;
    return priorityA - priorityB;
});