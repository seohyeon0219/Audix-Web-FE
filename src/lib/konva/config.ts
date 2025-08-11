// 장비 위치 정보
export interface DevicePosition {
    deviceId: number;
    x: number;
    y: number;
}

// 컨베이어 벨트 정보
export interface AreaLayout {
    areaId: number;
    devices: DevicePosition[];
    conveyors?: Array<{ points: number[] }>;
}

// areaCanvas
export const CANVAS_CONFIG = {
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


// conveyorLine
export const CONVEYOR_CONFIG = {
    stroke:'#808080',
    strokeWidth: 50,
    lineCap: 'square' as const,
    lineJoin: 'round' as const,
    type: 'conveyor'
} as const  

