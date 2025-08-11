import { PeriodType } from "@/types/recharts/common";
import { PeriodButtons } from "@/types/recharts/common";

// 기간 선택 버튼
export const PERIOD_BUTTONS: readonly PeriodButtons[] = [
    { key: 'monthly', label: '월별'},
    { key: 'yearly', label: '년도별'},
] as const;

// 기간 선택 버튼
export const BUTTON_STYLES = {
    base: 'px-4 py-2 text-sm rounded transition-colors cursor-pointer',
    active: 'bg-main-500 text-white',
    inactive: 'text-white hover:bg-main-500 hover:text-white'
}

export const CHART_STYLES = {
    // 그리드 스타일
    grid: {
        strokeDasharray: "3 3",
        stroke:"#808080",
        horizontal: true,
        vertical: false
    },
    // 축 스타일
    axis: {
        axisLine: false,
        tickLine: false,
        tick: {
            fill: "#9CA3AF",
            fontSize: 12
        },
        className: "text-xs"
    },
    // 범례 스타일
    legend: {
        verticalAlign: "top",
        height: 40,
        iconType: "circle",
        wrapperStyle: {
            color: "#9CA3AF",
            paddingBottom: '20px'
        }
    },
    // 라인 스타일
    line: {
        type: 'monotone' as const,
        strokeWidth: 3,
        dot: {
            strokeWidth: 2,
            r: 5
        },
        activeDot: {
            r: 7,
            strokeWidth: 2
        }
    },
    // 차트 마진
    margin: {
        top: 20,
        right: 30,
        left: 20,
        bottom: 20
    }
} as const;

// y축 도메인 설정
export const CHART_DOMAINS = {
    value: [0, 'dataMax' as const],
    alarm: [0, 'dataMax' as const]
} as const;

// 차트 컨테이너 설정
export const CHART_CONTAINER = {
    wrapper: 'bg-main-100 p-6 rounded-lg',
    headerWrapper: 'felx items-center justify-between mb-6',
    titleWrapper: 'div',
    titleStyle: 'text-white text-lg font-medium',
    buttonWrapper: 'flex gap-2 mt-4',
    chartWrapper: 'h-80',
    container: {
        backgrounded: 'bg-main-100',
        padding: 'p-6',
        borderRadius: 'rounded-lg',
        height: 'h-80'
    }
} as const;

// ResponsiceContainer
export const RESPONSIVE_CONTAINER = {
    width: '100%',
    height: '100%'
}