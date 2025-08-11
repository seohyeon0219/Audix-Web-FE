import { combineDevicesWithPositions, findDeviceById, getAreaLayout, getLevelLabel, getRouteByNodeId } from "@/utils/konva/index";

// 구역 데이터 관리
export const useAreaData = (areaId: string) => {
    const areaIdNum = parseInt(areaId);
    const devicesWithPositions = combineDevicesWithPositions(areaIdNum);
    const areaLayout = getAreaLayout(areaIdNum);

    return { devicesWithPositions, areaLayout };
}