'use client';

import { mockAreaMachineData } from "@/mocks";
import { getStatusFromMachines } from "@/utils/statusUtils";
import AreaCard from "@/components/areaMonitoring/areaCard";

export default function AreaList() {

    // 상태별 정렬
    const sortedAreas = [...mockAreaMachineData].sort((a, b) => {
        const statusA = getStatusFromMachines(a.machines);
        const statusB = getStatusFromMachines(b.machines);

        return statusA.priority - statusB.priority;
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