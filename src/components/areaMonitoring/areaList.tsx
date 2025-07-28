'use client';

import { mockAreaCardData } from "./areaCard";
import AreaCard from "./areaCard";

export default function AreaList() {
    return (
        <div className="grid grid-cols-4 gap-4">
            {mockAreaCardData.map((area) => (
                <AreaCard
                    key={area.id}
                    data={area}
                />
            ))}
        </div>
    )
}