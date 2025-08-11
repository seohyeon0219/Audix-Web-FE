'use client';

import { NodeTooltipProps } from '@/lib/konva/types';

// 호버 시 툴팁 표시
import { Group, Rect, Text } from 'react-konva';

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
                text={`장비명: ${data.name}\n모델명: ${data.model}\n상태: ${data.status}`}
                x={5}
                y={5}
                fontSize={12}
                fill="#333"
            />
        </Group>
    )
}