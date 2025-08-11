import { AlarmChartDataPoint } from "@/types/recharts/alarmLineChart";
import { PeriodType } from "@/types/recharts/common";
import { alarmChartMockData } from "@/mocks/recharts";

export const generateAlarmChartData = (period: PeriodType): AlarmChartDataPoint[] => {
    return alarmChartMockData[period]();
}