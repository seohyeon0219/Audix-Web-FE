'use client';

import { ConveyorLineProps } from '@/types/konva/index';
import { CONVEYOR_CONFIG } from '@/config/konva/index';
import { useConveyorTooltip } from '@/hooks/konva/index';
import { Line } from 'react-konva';

export default function ConveyorLine ({ points, onHover, onLeave }: ConveyorLineProps) {
    
    const { handleMouseEnter, handleMouseLeave } = useConveyorTooltip();

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