import { useMemo } from "react";
import { MockAreaData } from "@/mocks";

// 구역 정보 찾기
export const useSearchArea = (areaId: string) => {
    const area = useMemo(() => {
        return MockAreaData.find(area => area.id === parseInt(areaId));
    }, [areaId]);

    return { area };
}