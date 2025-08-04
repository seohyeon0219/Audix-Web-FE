import { AlarmDataType, AlarmDataCount } from "@/types/alarmDataType";

// 이번 달 알림 건수 mock data
export const mockAlarmDataCounts: AlarmDataCount = {
    danger: 1,
    warning: 5
}

export const alarms = [
    {
        key: 'danger' as AlarmDataType,
        label: '위험',
        count: mockAlarmDataCounts.danger,
        textColor: 'text-danger',
        borderColor: 'border-danger'
    },
    {
        key: 'warning' as AlarmDataType,
        label: '점검요망',
        count: mockAlarmDataCounts.warning,
        textColor: 'text-warning',
        borderColor: 'border-warning'
    },
]