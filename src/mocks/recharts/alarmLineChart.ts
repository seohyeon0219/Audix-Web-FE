import { AlarmChartDataPoint } from "@/types/recharts";

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

