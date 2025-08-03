'use client';

import { useRouter } from "next/navigation";
import { mockAreaMachineData } from '@/mocks/index';
import getStatusColorFromValue, { getStatusFromMachines } from '@/utils/statusUtils';
import { AreaData } from '@/types/areaMachineType';

interface AreaCardProps {
    data: AreaData;
    index: number;
    onClick?: (areaId: string) => void;
}

export default function AreaCard ({ data, index, onClick }: AreaCardProps) {
    const router = useRouter();

    const statusStyles = getStatusFromMachines(data.machines);

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
            {/* 하단 : 담당자 */}
            <div>
                <p className="text-white">담당자 : {data.manager}</p>
            </div>
        </div>
    )
}