import { ValueChartDataPoint } from "@/types/recharts/valueLineChart";

export const valueChartMockData = {
    monthly: (): ValueChartDataPoint[] => [
        { period: '1월', value: 0.8 },
        { period: '2월', value: 0.9 },
        { period: '3월', value: 0.86 },
        { period: '4월', value: 0.7 },
        { period: '5월', value: 0.98 },
        { period: '6월', value: 0.87 },
        { period: '7월', value: 0.85 },
        { period: '8월', value: 0.99 },
        { period: '9월', value: 0.98 },
        { period: '10월', value: 0.87 },
        { period: '11월', value: 0.85 },
        { period: '12월', value: 0.99 },
    ],
    yearly: (): ValueChartDataPoint[] => [
        { period: '2021', value: 0.9 },
        { period: '2022', value: 0.8 },
        { period: '2023', value: 0.97 },
        { period: '2024', value: 0.89 },
        { period: '2025', value: 0.9 },
    ]
} as const;
        