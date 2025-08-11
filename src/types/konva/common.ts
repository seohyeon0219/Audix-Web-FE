// conveyorLine
export interface ConveyorLineProps {
    points: number[]; // 라인을 어디에 그릴지 좌표로 정해주는 값
    onHover?: (type: string, x: number, y: number) => void; // 툴팁용
    onLeave?: () => void;
}

