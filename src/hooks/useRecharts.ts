import { useState, useMemo } from 'react';
import { PeriodType } from '@/lib/recharts/types';
import { convertToPercentage, generateAlarmChartData, generateValueChartData, getColorByValue } from '@/lib/recharts/utils';
import { MockDeviceData } from '@/mocks';

// common
// 기간 선택 hook
export const useChartPeriod = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('monthly');

    const handlePeriodChange = (period: PeriodType) => {
        setSelectedPeriod(period);
    };

    return {
        selectedPeriod,
        handlePeriodChange
    }
}

// valueLineChart
export const useValueChartData = (selectedPeriod: PeriodType) => {
    const chartData = useMemo(() => {
        return generateValueChartData(selectedPeriod);
    }, [selectedPeriod]);

    return chartData;
}


// alarmLineChart
export const useAlarmChartData = (selectedPeriod: PeriodType) => {
    const chartData = useMemo(() => {
        return generateAlarmChartData(selectedPeriod);
    }, [selectedPeriod]);

    return chartData;
}


// pieChart
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