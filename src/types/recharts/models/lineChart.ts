export interface AlarmLinesChartDataPoint {
    period: string;
    danger: number;
    warning: number;
}

export interface ValueChartDataPoint {
    period: string;
    value: number;
}

export type PeriodType = 'monthly' | 'yearly';

// 기간 선택 버튼
export interface PeriodButtons {
    key: PeriodType;
    label: string;
}