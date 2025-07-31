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
    onClick: (id: string) => void;
    onHover?: (id: string, x: number, y: number) => void;
    onLeave?: () => void;
}

export default function MachineNode({ id, x, y, status, name, onClick, onHover, onLeave }: MachineNodeProps) {
    const size = 20;

    return (
        <Group x={x} y={y}>
            <Circle
                width={size}
                height={size}
                x={-size/2}
                y={-size/2 + 10}
                fill={getStatusColor(status)}
                onClick={() => onClick(id)}
                onMouseEnter={(e) => {
                    const pos = e.target.getStage()?.getPointerPosition();
                    if (pos) onHover?.(id, pos.x, pos.y);
                }}
                onMouseLeave={() => onLeave?.()}
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