'use client';

import { mockAreaCardData } from "@/components/areaMonitoring/areaCard";
import AreaCard from "@/components/areaMonitoring/areaCard";

export default function AreaList() {
    // 상태별 우선순위
    const statusPriority = {
        'danger': 1,
        'warning': 2,
        'safe': 3,
        'offline': 4,
        'repair': 5
    }

    // 상태별 정렬
    const sortedAreas = [...mockAreaCardData].sort((a, b) => {
        return statusPriority[a.status] - statusPriority[b.status];
    });

    return (
        <div className="grid grid-cols-4 gap-4">
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