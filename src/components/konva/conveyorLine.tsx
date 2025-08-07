'use client';

import { ConveyorLineProps } from '@/types/deviceMonitoring';

// 컨베이어 라인 (흰색 선)
import { Line } from 'react-konva';

export default function ConveyorLine ({ points, onHover, onLeave }: ConveyorLineProps) {
    const handleHover = (x: number, y: number) => {
        onHover?.('conveyor', x, y); // 항상 conveyor
    }
    return (
        <Line
            points={points}
            stroke='#808080'
            strokeWidth={50}
            lineCap='square'
            lineJoin='round'
            onMouseEnter = {(e) => {
                const pos = e.target.getStage()?.getPointerPosition();
                if (pos) onHover?.('conveyor', pos.x, pos.y);
            }}
            onMouseLeave={() => {
                onLeave?.(); // 툴팁 숨기기;
            }}
        />
    )
}