import { DeviceData } from "@/types/models/device";

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