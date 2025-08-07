'use client';

import { useRouter } from "next/navigation";
import { getStatusStyleFromString } from '@/utils/statusUtils';
import { AreaData } from "@/types/mocks";

// 구역 카드 props 타입 정의
export interface AreaCardProps {
    data: AreaData;
    index: number;
    onClick?: (areaId: string) => void;
}


export default function AreaCard ({ data, index, onClick }: AreaCardProps) {
    const router = useRouter();

    const statusStyle = getStatusStyleFromString(data.status);

    const handleClick = () => {
        router.push(`/area/${data.id}`);
    };

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