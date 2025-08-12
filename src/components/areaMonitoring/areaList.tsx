'use client';

import { MockAreaData } from "@/mocks";
import AreaCard from "@/components/areaMonitoring/areaCard";
import { STATUS_STYLES } from "@/constants/status";

export default function AreaList() {
    // mock data와 직접 관련이 있는 유틸 함수이므로 컴포넌트 내에 두기로 함
    // Utils에는 Pure function만 들어가기 때문에 
    // areaCard 상태별 정렬
    const sortedAreas = [...MockAreaData].sort((a, b) => {
        const statusA = a.status || 'offline';
        const statusB = b.status || 'offline';

        // STATUS_STYLES에서 priority 찾기
        const priorityA = Object.values(STATUS_STYLES).find(style => style.status === statusA)?.priority || 999;
        const priorityB = Object.values(STATUS_STYLES).find(style => style.status === statusB)?.priority || 999;
        return priorityA - priorityB;
    });

    return (
        <div className="grid grid-cols-1 gap-4">
            {sortedAreas.map((area) => (
                <AreaCard
                    key={area.id}
                    data={area}
                />
            ))}
        </div>
    )
}