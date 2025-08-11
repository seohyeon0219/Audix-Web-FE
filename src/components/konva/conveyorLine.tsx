'use client';

import { ConveyorLineProps } from '@/lib/konva/types';
import { CONVEYOR_CONFIG } from '@/lib/konva/config';
import { useConveyorHandlers } from '@/hooks/useKonva';
import { Line } from 'react-konva';

export default function ConveyorLine ({ points, onHover, onLeave }: ConveyorLineProps) {
    const { handleMouseEnter, handleMouseLeave } = useConveyorHandlers();

    return (
        <Line
            points={points}
            stroke={CONVEYOR_CONFIG.stroke}
            strokeWidth={CONVEYOR_CONFIG.strokeWidth}
            lineCap={CONVEYOR_CONFIG.lineCap}
            lineJoin={CONVEYOR_CONFIG.lineJoin}
            onMouseEnter = {(e) => handleMouseEnter(e, onHover)}
            onMouseLeave={() => handleMouseLeave(onLeave)}
        />
    )
}