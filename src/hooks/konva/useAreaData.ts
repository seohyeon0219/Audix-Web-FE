import { combineDevicesWithPositions, getAreaLayout } from "@/utils/konva/index";
import { useMemo } from "react";

// 구역 데이터 관리
export const useAreaData = (areaId: string) => {
    const areaIdNum = parseInt(areaId);

    // areaIdNum이 변경될 때만 combineDecivesWithPosition 함수 다시 실행
    const devicesWithPositions = useMemo(() => {
        return combineDevicesWithPositions(areaIdNum)
    }, [areaIdNum]);

    // areaIdNum이 변경될 때만 getAreaLayout 함수 다시 실행
    const areaLayout = useMemo(() => {
        return getAreaLayout(areaIdNum);
    }, [areaIdNum]);

    return { devicesWithPositions, areaLayout };
}