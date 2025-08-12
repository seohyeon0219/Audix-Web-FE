import { useRouter } from "next/navigation";
import { findDeviceById } from "@/utils/konva/index";

// factoryCanvas node 핸들러
// 라우팅 + 툴팁 
export const useDeviceInteraction = (areaId: string, showTooltip: (x: number, y: number, data: any) => void) => {
    const router = useRouter();

    // 클릭 시 장비 상세 페이지로 이동 라우팅
    const handleClick = (deviceId: string) => {
        router.push(`/area/${areaId}/device/${deviceId}`);
    };

     // 장비 호버 시 ID로 장비 정보를 찾아 툴팁 표시
    const handleHover = (deviceId: string, x: number, y: number) => {
        const device = findDeviceById(deviceId);
        if (device) {
            showTooltip(x, y, {
                name: device.name,
                model: device.model,
                status: device.status
            });
        }
    };

    // 마우스 호버 시 툴팁 표시
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

    // 마우스 호버 시 툴팁 표시
    const handleMouseLeave = (onLeave?: () => void) => {
        onLeave?.();
    };

    return { handleClick, handleHover, handleMouseEnter, handleMouseLeave };
}
