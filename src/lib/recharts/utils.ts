import { AlarmChartDataPoint, ValueChartDataPoint } from "@/types/deviceMonitoring";
import { alarmChartMockData, valueChartMockData } from "./mockData";
import { PeriodType } from "@/types/deviceMonitoring";

// valueLineChart
export const generateValueChartData = (period: PeriodType): ValueChartDataPoint[] => {
    return valueChartMockData[period]();
}


// alarmLinesChart
export const generateAlarmChartData = (period: PeriodType): AlarmChartDataPoint[] => {
    return alarmChartMockData[period]();
}