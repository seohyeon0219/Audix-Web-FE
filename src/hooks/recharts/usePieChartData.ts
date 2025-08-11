import { useState, useMemo } from 'react';
import { PeriodType } from '@/types/recharts/index';
import { convertToPercentage, generateAlarmChartData, generateValueChartData, getColorByValue } from '@/utils/recharts/index';
import { MockDeviceData } from '@/mocks';


// pieChart 데이터 관리
export const useDevicePieChart = (areaId: string, deviceId: string) => {
    const device = useMemo(() => {
        return MockDeviceData.find(d => 
            d.areaId === parseInt(areaId) && d.deviceId === parseInt(deviceId)
        );
    }, [areaId, deviceId]);

    const chartData = useMemo(() => {
        if (!device || device.normalScore === undefined) return null;

        const percentage = convertToPercentage(device.normalScore);
        const data = [
            { name: 'completed', value: percentage },
            { name: 'remaining', value: 100 - percentage }
        ];

        const mainColor = getColorByValue(percentage);
        const colors = [mainColor, '#f2f2f2'];

        return { data, colors, percentage };
    }, [device]);

    return { device, chartData };
}