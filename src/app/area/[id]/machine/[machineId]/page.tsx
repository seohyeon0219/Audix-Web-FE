'use client';

import { use } from 'react';
import { MockAreaData, MockDeviceData } from '@/mocks';
import Info from "@/components/machineMonitoring/info";
import MachinePieChart from "@/components/machineMonitoring/pieChart";
import AiText from '@/components/machineMonitoring/aiText';
import AlarmLinesChart from '@/components/machineMonitoring/AlarmLinesChart';
import ValueLineChart from '@/components/machineMonitoring/valueLineChart';

interface MachinePageProps {
    params: Promise<{ id: string, machineId: string }>;
}

export default function MachinePage({ params }: MachinePageProps) {
    const { id: areaId, machineId } = use(params);

    // 구역 정보 찾기
    const area = MockAreaData.find(area => area.id === parseInt(areaId));

    // 장비 정보 찾기
    const device = MockDeviceData.find(device => 
        device.areaId === parseInt(areaId) && 
        device.deviceId === parseInt(machineId)
    )

    return (
        <div>
            {/* 장비 정보 */}
            <div>
                <Info areaId={areaId} machineId={machineId} />
            </div>
            {/* 통계 섹션 */}
            <div className='bg-main-500 gap-3 mt-4'>
                <div className='flex gap-6 p-4 items-stretch h-52'>
                    <div className='flex-[2.5] min-w-0'>
                        <MachinePieChart
                            areaId={areaId}
                            machineId={machineId}
                            title="장비 정상도"
                        />
                    </div>
                    <div className='flex-[7.5] min-w-0'>
                        <AiText 
                            areaId={areaId}
                            machineId={machineId}
                        />
                    </div>
                </div>
                {/* 정상도 선그래프 */}
                <div>
                    <div className='px-4'>
                        <ValueLineChart />
                    </div>
                    {/* 알람 선그래프 */}
                    <div className='p-4'>
                        <AlarmLinesChart />
                    </div>
                </div>
            </div>
        </div>
    )
}