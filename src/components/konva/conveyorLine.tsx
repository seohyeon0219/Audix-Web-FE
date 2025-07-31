'use client';

// 컨베이어 라인 (흰색 선)
import { Line, Arrow, Group } from 'react-konva';

interface ConveyorLineProps {
    points: number[]; // 라인을 어디에 그릴지 좌표로 정해주는 값
    onHover?: (type: string, x: number, y: number) => void; // 툴팁용
    onLeave?: () => void;
}

export default function ConveyorLine ({ points, onHover, onLeave }: ConveyorLineProps) {
    const handleHover = (x: number, y: number) => {
        onHover?.('conveyor', x, y); // 항상 conveyor
    }
    return (
        <Line
            points={points}
            stroke='white'
            strokeWidth={6}
            lineCap='round'
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