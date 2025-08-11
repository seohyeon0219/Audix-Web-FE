import { ValueChartDataPoint, AlarmChartDataPoint } from "@/lib/recharts/types";

// common



// valueLineChart
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
        

// alarmLinesChart
export const alarmChartMockData = {
    monthly: (): AlarmChartDataPoint[] => [
        { period: '1월', danger: 2, warning: 3 },
        { period: '2월', danger: 0, warning: 4 },
        { period: '3월', danger: 0, warning: 0 },
        { period: '4월', danger: 0, warning: 4 },
        { period: '5월', danger: 1, warning: 0 },
        { period: '6월', danger: 1, warning: 3 },
        { period: '7월', danger: 0, warning: 2 },
        { period: '8월', danger: 0, warning: 1 },
        { period: '9월', danger: 0, warning: 0 },
        { period: '10월', danger: 0, warning: 0 },
        { period: '11월', danger: 1, warning: 4 },
        { period: '12월', danger: 2, warning: 0 }
    ],
    yearly: (): AlarmChartDataPoint[] => [
        { period: '2021', danger: 5, warning: 13},
        { period: '2022', danger: 2, warning: 15},
        { period: '2023', danger: 6, warning: 18},
        { period: '2024', danger: 3, warning: 12},
        { period: '2025', danger: 7, warning: 21}
    ]
} as const;

