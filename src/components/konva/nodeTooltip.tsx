'use client';

// 호버 시 툴팁 표시
import { Group, Rect, Text } from 'react-konva';

interface NodeTooltipProps {
    x: number;
    y: number;
    visible: boolean;
    data: {
        name: string;
        status: string;
    }
}

export default function NodeTooltip({ x, y, visible, data }: NodeTooltipProps) {

    return (
        <Group x={x + 15} y={y + 15}>
            <Rect
                width={150}
                height={50}
                fill="white"
                stroke="#ccc"
            />
            <Text 
                text={`장비명: ${data.name}\n현재상태: ${data.status}`}
                x={5}
                y={5}
                fontSize={12}
                fill="#333"
            />
        </Group>
    )
}