// 차트 라벨
export const ALARM_LINES_CHART_LABELS = {
    alarm : {
        title: '알람 내역 그래프',
        dangerLineName: '위험',
        warningLineName: '점검요망',
        yAxisFormatter: (value: number) => `${value}건`
    }
} as const;