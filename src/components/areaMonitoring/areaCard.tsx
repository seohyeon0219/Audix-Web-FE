'use client';

import { useAreaCard } from "@/hooks/useAreaCard";
import { AreaCardProps } from "@/types/props/areaCard";

export default function AreaCard ({ data, index, onClick }: AreaCardProps) {
    const { statusStyle, handleClick } = useAreaCard(data);

    return (
        <div
            className="w-64 bg-main-100 cursor-pointer border-1 border-black p-4"
            onClick={handleClick}
        >
            {/* 상단 : 구역명 + 상태 */}
            <div className="flex justify-between">
                <h3 className="text-white font-black text-xl">{data.name}</h3>
                <div className={`p-2 text-sm rounded-sm border border-black ${statusStyle.bgColor}`}>
                    {statusStyle.label}
                </div>
            </div>
            {/* 하단 : 위치 + 장비수 */}
            <div>
                <p className="text-white text-sm">{data.address}</p>
            </div>
        </div>
    )
}