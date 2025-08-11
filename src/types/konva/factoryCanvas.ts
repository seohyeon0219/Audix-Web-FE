// 타입들
export type NodeLevel = 'factory' | 'line' | 'process';
export type StatusType = 'normal' | 'warning' | 'danger';

export interface ProcessNode {
    id: string;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    level: 'factory' | 'process';
    areaId: number;
    address: string;
    status: StatusType;
}

export interface LayoutNode {
    id: string;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    level: 'factory' | 'process';
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