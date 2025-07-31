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
    const tooltipWidth = 150;
    const tooltipHeight = 50;
    const offset = 15; // 커서 ~ 툴팁 사이의 거리

    return (
        <Group x={x + offset} y={y + offset}>
            <Rect
                width={tooltipWidth}
                height={tooltipHeight}
                fill="white"
                stroke="border-login-gray"
            />
            <Text 
                text={`장비명: ${data.name}`}
                x={5}
                y={5}
                fontSize={12}
                fill="#333"
            />
        </Group>
    )
}