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
