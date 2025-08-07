import { AreaData } from "@/types/mocks";
import { DeviceData } from '@/types/mocks';

// aiText
export interface AiTextProps {
    areaId: string;
    deviceId: string;
}

export interface AiTextResult {
    status: 'warning' | 'danger' | 'normal' | 'repair' | 'offline';
    message: string;
}


// alarmLinesChart
export type PeriodType = 'monthly' | 'yearly';

export interface AlarmChartDataPoint {
    period: string;
    danger: number;
    warning: number;
}

export interface AlarmLinesChartProps {
    title?: string;
}


// piechart
export interface DevicePieChartProps {
    areaId: string;
    deviceId: string;
    title?: string;
}


// valueLineChart
export interface ValueChartDataPoint {
    period: string;
    value: number;
}


// info
export interface DeviceInfoProps {
    areaId: string;
    deviceId: string;
    area?: AreaData;
    device?: DeviceData;
}

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
