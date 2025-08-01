'use client';

import { use } from 'react';

import Info from "@/components/machineMonitoring/info";
import MachinePieChart from "@/components/machineMonitoring/pieChart";
import AiText from '@/components/machineMonitoring/aiText';
import StatusLineChart from '@/components/machineMonitoring/linesChart';

interface MachinePageProps {
    params: Promise<{ machineId: string }>;
    searchParams: Promise<{ areaId?: string}>;
}

export default function MachinePage({ params, searchParams }: MachinePageProps) {
    const { machineId } = use(params);
    const resolveSearchParams = searchParams ? use(searchParams) : {};
    const areaId = resolveSearchParams?.areaId || '1';

    return (
        <div>
            {/* 장비 정보 */}
            <div>
                <Info areaId={areaId} machineId={machineId} />
            </div>
            {/* 통계 섹션 */}
            <div className='bg-main-500 grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 mt-4'>
                <MachinePieChart
                    areaId={areaId}
                    machineId={machineId}
                    title="장비 정상도"
                />
                <AiText 
                    areaId={areaId}
                    machineId={machineId}
                />
            </div>
            {/* 선그래프 */}
            <div className='bg-main-500 p-4'>
                <StatusLineChart />
            </div>
        </div>
    )
}