import { DeviceData } from "../models/device";

// 타입들
export interface DevicePosition {
    deviceId: number;
    x: number;
    y: number;
}

export interface AreaLayout {
    areaId: number;
    devices: DevicePosition[];
    conveyors?: Array<{ points: number[] }>;
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

// 컴포넌트 타입들
// deviceNode
export interface DeviceNodeProps {
    id: string;
    x: number;
    y: number;
    status: string;
    areaId: number;
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