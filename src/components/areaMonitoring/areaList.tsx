'use client';

import { MockAreaData } from "@/mocks";
import { getStatusStyleFromString, STATUS_STYLES } from "@/utils/statusUtils";
import AreaCard from "@/components/areaMonitoring/areaCard";
import { sortedAreas } from "@/utils/statusUtils";

export default function AreaList() {
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