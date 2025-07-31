'use client';

// 장비 노드
import { Circle, Text, Group, Rect } from 'react-konva';

import { getStatusColor, type StatusType } from '../../constants/statusColor';

interface MachineNodeProps {
    id: string;
    x: number;
    y: number;
    status: StatusType;
    name: string;
    // type: 'sensor' | 'machine' | 'equipment';
    onClick: (id: string) => void;
    onHover?: (id: string, x: number, y: number) => void;
    onLeave?: () => void;
}

export default function MachineNode({ id, x, y, status, name, onClick, onHover, onLeave }: MachineNodeProps) {
    const size = 20;

    return (
        <Group x={x} y={y}>
            <Rect
                width={size}
                height={size}
                z={-size/2}
                y={-size/2}
                fill={getStatusColor(status)}
                onClick={() => onClick(id)}
                onMouseEnter={(e) => onHover?.(id, e.target.x(), e.target.y())}
                onMouseLeave={() => onLeave?.()}
                cursor="pointer"
            />
            <Text
                text={name}
                fontSize={10}
                y={size / 2 + 5}
                offsetX={name.length * 3}
                fill="black"
            />
        </Group>
    )
}