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
    const width = 20;
    const height = 20;

    return (
        <Group x={x} y={y}>
            <Circle
                width={width}
                height={height}
                x={-width/2}
                y={-height/2 + 10}
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
                fontSize={15}
                x={width/2 + 10}
                y={-height/2 - 15}
                width={width + 100}
                height={height}
                align='start'
                verticalAlign='middle'
                offsetX={name.length * 3}
                fill="white"
            />
        </Group>
    )
}