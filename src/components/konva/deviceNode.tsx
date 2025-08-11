'use client';

// 장비 노드
import {Text, Group, Rect } from 'react-konva';
import { getStatusStyleFromString } from '@/utils/statusUtils';
import { DeviceNodeProps } from '@/lib/konva/types';
import { useHandlers } from '@/hooks/useKonva';

export default function DeviceNode({ id, x, y, status, name, onClick, onHover, onLeave }: DeviceNodeProps) {
    const width = 60;
    const height = 40;

    const statusStyle = getStatusStyleFromString(status);
    const { handleClick, handleMouseEnter, handleMouseLeave} = useHandlers(id);

    return (
        <Group x={x} y={y}>
            <Rect
                width={width}
                height={height}
                x={-width/2}
                y={-height/2}
                fill={statusStyle.hexColor}
                strokeWidth={2}
                cornerRadius={5}
                onClick={() => handleClick(id)}
                onMouseEnter={(e) => handleMouseEnter(e, id, onHover)}
                onMouseLeave={() => handleMouseLeave(onLeave)}
                style={{ cursor: 'pointer' }}
            />
            {/*  사각형 안에 장비 ID 표시 */}
            <Text
                text={id}
                fontSize={15}
                x={0}
                y={6}
                align='center'
                justify='center'
                offsetX={id.length * 3}
                offsetY={15 / 2}
                fill="white"
                fontStyle='bold'
            />
            {/* 사각형 아래에 장비 이름 라벨 */}
            <Text
                text={name}
                fontSize={12}
                x={0}
                y={height/2 + 10}
                fill="white"
                align="center"
                offsetX={name.length * 3}
            />
        </Group>
    )
}