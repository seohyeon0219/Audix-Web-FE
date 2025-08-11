import { PeriodType } from '@/types/recharts/common';
import { useState, useMemo } from 'react';

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