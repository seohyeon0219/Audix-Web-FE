import { AlarmChartDataPoint, ValueChartDataPoint, PeriodType } from "@/lib/recharts/types";
import { alarmChartMockData, valueChartMockData } from "./mockData";

// valueLineChart
export const generateValueChartData = (period: PeriodType): ValueChartDataPoint[] => {
    return valueChartMockData[period]();
}


// alarmLinesChart
export const generateAlarmChartData = (period: PeriodType): AlarmChartDataPoint[] => {
    return alarmChartMockData[period]();
}


// pieChart
// value를 percentage로 변환
export const convertToPercentage = (normalScore: number): number => {
    return Math.round(normalScore * 100);
}

// normalScore에 따른 색상
export const getColorByValue = (value: number): string => {
    if (value >= 80) return "#1CAA00";
    if (value >= 40) return "#FFC525";
    return "#FF2F16";
}