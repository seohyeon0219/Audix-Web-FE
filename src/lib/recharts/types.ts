// common
export type PeriodType = 'monthly' | 'yearly';

export interface LinesChartProps {
    title?: string;
}


// valueLineChart
export interface ValueChartDataPoint {
    period: string;
    value: number;
}


// alarmLinesChart
export interface AlarmChartDataPoint {
    period: string;
    danger: number;
    warning: number;
}



// piechart
export interface DevicePieChartProps {
    areaId: string;
    deviceId: string;
    title?: string;
}
