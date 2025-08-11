import { useRouter } from "next/navigation";
import { combineDevicesWithPositions, findDeviceById, getAreaLayout, getLevelLabel, getRouteByNodeId } from "@/utils/konva/index";

// 컨베이어 벨트 핸들러
// 툴팁
export const useConveyorTooltip = () => {
    const handleMouseEnter = (
        e: any,
        onHover?: (type: string, x: number, y: number) => void
    ) => {
        const pos = e.target.getStage()?.getPointerPosition();
        if (pos && onHover) {
            onHover('conveyor', pos.x, pos.y);
        }
    };

    const handleMouseLeave = (onLeave?: () => void) => {
        onLeave?.();
    };

    return { handleMouseEnter, handleMouseLeave };
}