import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { MockDeviceData } from '@/mocks/data/deviceData';
import { DevicePieChartProps } from '@/lib/recharts/types';
import { useDevicePieChart } from '@/hooks/useRecharts';
import { RESPONSIVE_CONTAINER } from '@/lib/recharts/config';

const DevicePieChart: React.FC<DevicePieChartProps> = ({
    areaId,
    deviceId,
    title
}) => {
    const { device, chartData } = useDevicePieChart(areaId, deviceId);

    // device이 없는 경우 처리
    if (!device) {
        return (
            <div className='bg-main-100 p-6 rounded-lg'>
                <h2 className='text-white text-lg font-medium mb-6'>
                    {title || '장비 정상도'}
                </h2>
                <p className='text-white'>장비를 찾을 수 없습니다.</p>
            </div>
        )
    }

    // device.value가 없는 경우 처리
    if (device.normalScore === undefined) {
        return (
            <div className='bg-main-100 p-6 rounded-lg'>
                <h2 className='text-white text-lg rounded-lg'>
                    {title || `${device.name} 정상도`}
                </h2>
                <p className='text-white'>데이터가 없습니다.</p>
            </div>
        )
    }

    const { data, colors, percentage } = chartData!;

    return (
        <div className='flex gap-10 bg-main-100 p-6 rounded-lg'>
            <h2 className='text-white text-lg font-medium mb-6'>
                {title || `${device.name} 정상도`}
            </h2>
            <div className='flex'>
                <div className='relative w-32 h-32'>
                <ResponsiveContainer width={RESPONSIVE_CONTAINER.width} height={RESPONSIVE_CONTAINER.height}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={60}
                                startAngle={90}
                                endAngle={-270}
                                dataKey="value"
                                stroke="none"
                                animationBegin={0}
                                animationDuration={800}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <span className='text-white text-xl font-bold'>{percentage}%</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DevicePieChart;