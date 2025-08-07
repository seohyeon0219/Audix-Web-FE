import { AreaData } from "@/types/mocks";
import { DeviceData } from '@/types/mocks';

// aiText
export interface AiTextProps {
    areaId: string;
    deviceId: string;
}

export interface AiTextResult {
    status: 'warning' | 'danger' | 'normal' | 'repair' | 'offline';
    message: string;
}


// alarmLinesChart
export type PeriodType = 'monthly' | 'yearly';

export interface AlarmChartDataPoint {
    period: string;
    danger: number;
    warning: number;
}

export interface AlarmLinesChartProps {
    title?: string;
}


// piechart
export interface DevicePieChartProps {
    areaId: string;
    deviceId: string;
    title?: string;
}


// valueLineChart
export interface ValueChartDataPoint {
    period: string;
    value: number;
}


// info
export interface DeviceInfoProps {
    areaId: string;
    deviceId: string;
    area?: AreaData;
    device?: DeviceData;
}