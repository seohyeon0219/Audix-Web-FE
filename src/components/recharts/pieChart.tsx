import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { MockDeviceData } from '@/mocks/data/deviceData';
import { DevicePieChartProps } from '@/types/deviceMonitoring';

const DevicePieChart: React.FC<DevicePieChartProps> = ({
    areaId,
    deviceId,
    title
}) => {
    // 특정 장비 찾기
    const device = MockDeviceData.find(d =>
        d.areaId === parseInt(areaId) && d.deviceId === parseInt(deviceId)
    );

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

    // value를 percentage로 변환
    const percentage = Math.round(device.normalScore * 100);

    // completed : percentage, remaining : 남은 부분
    const data = [
        { name: 'completed', value: percentage },
        { name: 'remaining', value: 100 - percentage }
    ];

    // 상태에 따른 색상
    const getColorByValue = (value: number) => {
        if (value >= 80) return "#1CAA00";
        if (value >= 40) return "#FFC525";
        return "#FF2F16";
    };

    const mainColor = getColorByValue(percentage);
    const COLORS = [mainColor, "#F2F2F2"];

    return (
        <div className='flex gap-10 bg-main-100 p-6 rounded-lg'>
            <h2 className='text-white text-lg font-medium mb-6'>
                {title || `${device.name} 정상도`}
            </h2>
            <div className='flex'>
                <div className='relative w-32 h-32'>
                    <ResponsiveContainer width="100%" height="100%">
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
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
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