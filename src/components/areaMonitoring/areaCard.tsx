'use client';

import { useRouter } from "next/navigation";
import { AreaCardProps } from '@/types/areaType';
import { getStatusFromString } from '@/utils/statusUtils';

export default function AreaCard ({ data, index, onClick }: AreaCardProps) {
    const router = useRouter();

    const statusStyles = getStatusFromString((data.status || 'offline') as 'normal' | 'warning' | 'danger' | 'offline' | 'repair');

    const handleClick = () => {
        router.push(`/area/${data.id}`);
    };

    return (
        <div
            className="w-64 bg-main-100 cursor-pointer border-1 border-black p-6"
            onClick={handleClick}
        >
            {/* 상단 : 구역명 + 상태 */}
            <div className="flex justify-between">
                <h3 className="text-white font-black text-xl">{data.name}</h3>
                <div className={`p-2 text-sm rounded-sm border border-black ${statusStyles.bgColor}`}>
                    {statusStyles.label}
                </div>
            </div>
            {/* 하단 : 위치 + 장비수 */}
            <div>
                <p className="text-white text-sm">{data.address}</p>
                {/* <p className="text-white">담당자 : {data.manager}</p> */}
            </div>
        </div>
    )
}