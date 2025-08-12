// areaCanvas 기본 설정
export const AREA_CANVAS_CONFIG = {
    defaultWidth: 800,
    defaultHeight: 500,
    container: {
        className: 'border border-white'
    },
    tooltip: {
        initialState: {
            visible: false,
            x: 0,
            y: 0,
            data: null,
            type: null
        }
    }
} as const;