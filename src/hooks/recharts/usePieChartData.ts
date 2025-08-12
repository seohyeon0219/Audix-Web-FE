import { useMemo } from 'react';
import { convertToPercentage } from '@/utils/recharts/index';
import { MockDeviceData } from '@/mocks';
import { PIE_CHART_COLORS_GRAY } from '@/config/recharts';
import { getStatusByNormalScore } from '@/utils/statusUtils';

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

        const statusStyle = getStatusByNormalScore(percentage);
        const mainColor = statusStyle.hexColor;
        const colors = [mainColor, PIE_CHART_COLORS_GRAY.background];

        return { data, colors, percentage };
    }, [device]);

    return { device, chartData };
}