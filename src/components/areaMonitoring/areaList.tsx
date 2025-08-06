'use client';

import { MockAreaData } from "@/mocks";
import { getStatusStyleFromString } from "@/utils/statusUtils";
import AreaCard from "@/components/areaMonitoring/areaCard";

export default function AreaList() {

    // 상태별 정렬
    const sortedAreas = [...MockAreaData].sort((a, b) => {
        const statusA = getStatusStyleFromString((a.status || 'offline') as 'normal' | 'warning' | 'danger' | 'offline');
        const statusB = getStatusStyleFromString((b.status || 'offline') as 'normal' | 'warning' | 'danger' | 'offline');

        return statusA.priority - statusB.priority;
    });

    return (
        <div className="grid grid-cols-1 gap-4">
            {sortedAreas.map((area, index) => (
                <AreaCard
                    key={area.id}
                    data={area}
                    index={index}
                />
            ))}
        </div>
    )
}