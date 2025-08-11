import { DeviceData } from "@/types/mocks";

// conveyorLine
export interface ConveyorLineProps {
    points: number[]; // 라인을 어디에 그릴지 좌표로 정해주는 값
    onHover?: (type: string, x: number, y: number) => void; // 툴팁용
    onLeave?: () => void;
}

// deviceNode
export interface DeviceNodeProps {
    id: string;
    x: number;
    y: number;
    status: string;
    name: string;
    onClick: (id: string) => void;
    onHover?: (id: string, x: number, y: number) => void;
    onLeave?: () => void;
}

// nodeTooltip
export interface NodeTooltipProps {
    x: number;
    y: number;
    visible: boolean;
    data: {
        name: string;
        model: string;
        status: string;
    }
}

// areaCanvas
export interface DevicePosition {
    deviceId: number;
    x: number;
    y: number;
}

export interface AreaLayout {
    areaId: number;
    devices: DevicePosition[];
    conveyors?: Array<{ pointes: number[] }>;
}

export interface TooltipState {
    visible: boolean;
    x: number;
    y: number;
    data: any;
    type?: 'device' | 'conveyor' | null;
}

export interface DeviceWithPosition extends DeviceData {
    x: number;
    y: number;
}


// conveyorLine
export interface ConveyorLineProps {
    points: number[];
    onHover?: (type: string, x: number, y: number) => void;
    onLeave?: () => void;
}

// factoryCanvas
export interface ProcessNode {
    id: string;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    level: 'factory' | 'line' | 'process' | 'material';
}

export interface FactoryCanvasProps {
    width?: number;
    height?: number;
} 

export interface FactoryTooltipState {
    visible: boolean;
    x: number;
    y: number;
    data: { name: string; level: string };
}

export interface Connection {
    from: { x: number; y: number };
    to: { x: number; y: number };
}