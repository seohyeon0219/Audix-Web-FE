import { valueChartMockData } from "@/mocks/recharts";
import { ValueChartDataPoint } from "@/types/recharts/valueLineChart";
import { PeriodType } from "@/types/recharts/common";

export const generateValueChartData = (period: PeriodType): ValueChartDataPoint[] => {
    return valueChartMockData[period]();
}