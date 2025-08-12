import { valueChartMockData } from "@/mocks/recharts";
import { ValueChartDataPoint } from "@/types/recharts";
import { PeriodType } from "@/types/recharts";

// 정상도 그래프에서 선택한 기간에 맞는 mock data를 반환
export const generateValueChartData = (period: PeriodType): ValueChartDataPoint[] => {
    return valueChartMockData[period]();
}