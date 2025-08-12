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

// 호버 시 효과용
export interface NodeStyle {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    textColor?: string;
}