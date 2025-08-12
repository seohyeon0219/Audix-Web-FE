// 파이 차트 스타일
export const PIE_CHART_STYLES = {
    pie: {
        cx: "50%",
        cy: "50%",
        innerRadius: 40,
        outerRadius: 60,
        startAngle: 90,
        endAngle: -270,
        dataKey: "value",
        stroke: "none",
        animation: {
            begin: 0,
            duration: 800
        }
    },
    // 차트 크기
    wrapper: {
        width: 'w-32',
        height: 'h-32'
    },
    // 퍼센트 텍스트 스타일
    percentText: {
        wrapper: "absolute inset-0 flex items-center justify-center",
        text: "text-white text-xl font-bold"
    }
}

// 파이 차트 컨테이너 설정
export const PIE_CHART_CONTAINER = {
    wrapper: 'flex gap-10 bg-main-100 p-6 rounded-lg h-full',
    titleStyle: 'text-white text-lg font-medium mb-6',
    chartSection: 'flex',
    chartWrapper: 'relative w-32 h-32'
}

// 파이 차트 기본 회색
export const PIE_CHART_COLORS_GRAY = {
    background: '#F2F2F2'
} as const;