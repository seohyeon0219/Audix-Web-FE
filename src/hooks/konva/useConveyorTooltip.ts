// 컨베이어 벨트 핸들러
// 툴팁
export const useConveyorTooltip = () => {
    
    // 마우스 호버 시 툴팁 표시
    const handleMouseEnter = (
        e: any,
        onHover?: (type: string, x: number, y: number) => void
    ) => {
        const pos = e.target.getStage()?.getPointerPosition();
        if (pos && onHover) {
            onHover('conveyor', pos.x, pos.y);
        }
    };

    // 마우스 리브 시 툴팁 숨김
    const handleMouseLeave = (onLeave?: () => void) => {
        onLeave?.();
    };

    return { handleMouseEnter, handleMouseLeave };
}