import { AlarmLinesChartDataPoint } from "@/types/recharts/models/lineChart";
import { PeriodType } from "@/types/recharts/models/lineChart";
import { alarmChartMockData } from "@/mocks/recharts";

// 알람 그래프에서 선택한 기간에 맞는 mock data를 반환
export const generateAlarmChartData = (period: PeriodType): AlarmLinesChartDataPoint[] => {
    return alarmChartMockData[period]();
}