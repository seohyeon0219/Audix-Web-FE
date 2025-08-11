import { STATUS_STYLES } from "@/constants/status";
import { AiTextResult } from "@/types/models/aiText";

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

