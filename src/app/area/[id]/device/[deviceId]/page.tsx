'use client';

import { use } from 'react';
import { MockAreaData, MockDeviceData } from '@/mocks';
import Info from "@/components/deviceMonitoring/info";
import DevicePieChart from "@/components/recharts/pieChart";
import AiText from '@/components/deviceMonitoring/aiText';
import AlarmLinesChart from '@/components/recharts/AlarmLinesChart';
import ValueLineChart from '@/components/recharts/valueLineChart';

interface DevicePageProps {
    params: Promise<{ id: string, deviceId: string }>;
}

export default function DevicePage({ params }: DevicePageProps) {
    const { id: areaId, deviceId } = use(params);

    // 구역 정보 찾기
    const area = MockAreaData.find(area => area.id === parseInt(areaId));

    // 장비 정보 찾기
    const device = MockDeviceData.find(device => 
        device.areaId === parseInt(areaId) && 
        device.deviceId === parseInt(deviceId)
    )

    return (
        <div>
            {/* 장비 정보 */}
            <div>
                <Info areaId={areaId} deviceId={deviceId} />
            </div>
            {/* 통계 섹션 */}
            <div className='bg-main-500 gap-3 mt-4'>
                <div className='flex gap-6 p-4 items-stretch h-52'>
                    <div className='flex-[2.5] min-w-0'>
                        <DevicePieChart
                            areaId={areaId}
                            deviceId={deviceId}
                            title="장비 정상도"
                        />
                    </div>
                    <div className='flex-[7.5] min-w-0'>
                        <AiText 
                            areaId={areaId}
                            deviceId={deviceId}
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