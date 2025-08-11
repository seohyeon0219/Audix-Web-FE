import { useRouter } from "next/navigation";
import { combineDevicesWithPositions, findDeviceById, getAreaLayout, getLevelLabel, getRouteByNodeId } from "@/utils/konva/index";

// factoryCanvas node 핸들러
// 라우팅 + 툴팁 
export const useDeviceInteraction = (areaId: string) => {
    const router = useRouter();

    const handleClick = (deviceId: string) => {
        router.push(`/area/${areaId}/device/${deviceId}`);
    };

    const handleHover = (deviceId: string, x: number, y: number, showTooltip: (x: number, y: number, data: any) => void) => {
        const device = findDeviceById(deviceId);
        if (device) {
            showTooltip(x, y, {
                name: device.name,
                model: device.model,
                status: device.status
            });
        }
    };

    const handleMouseEnter = (
        e: any,
        deviceId: string,
        onHover?: (deviceId: string, x: number, y: number) => void
    ) => {
        const pos = e.target.getStage()?.getPointerPosition();
        if (pos && onHover) {
            onHover(deviceId, pos.x, pos.y);
        }
    };

    const handleMouseLeave = (onLeave?: () => void) => {
        onLeave?.();
    };

    return { handleClick, handleHover, handleMouseEnter, handleMouseLeave };
}
