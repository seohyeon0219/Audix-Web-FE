export type PeriodType = 'monthly' | 'yearly';

export interface LinesChartProps {
    title?: string;
}

// 기간 선택 버튼
export interface PeriodButtons {
    key: PeriodType;
    label: string;
}