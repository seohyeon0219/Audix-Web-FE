'use client';

import { NodeTooltipProps } from '@/types/konva/index';

// 호버 시 툴팁 표시
import { Group, Rect, Text } from 'react-konva';

export default function NodeTooltip({ x, y, visible, data }: NodeTooltipProps) {

    return (
        <Group x={x + 10} y={y - 40}>
            <Rect
                width={180}
                height={55}
                fill='rgba(0,0,0,0.8)'
                stroke='#ffffff'
                strokeWidth={1}
                cornerRadius={5}
            />
            <Text 
                text={`장비명: ${data.name}\n모델명: ${data.model}\n상태: ${data.status}`}
                x={10}
                y={8}
                fontSize={12}
                fill="#ffffff"
            />
        </Group>
    )
}