import { useState, useMemo } from 'react';
import { PeriodType } from "@/types/recharts";
import { generateAlarmChartData, generateValueChartData } from '@/utils/recharts/index';

// valueLineChart 데이터 관리
export const useValueLineChartData = (selectedPeriod: PeriodType) => {
    const chartData = useMemo(() => {
        return generateValueChartData(selectedPeriod);
    }, [selectedPeriod]);

    return chartData;
}

// alarmLineChart 데이터 관리
export const useAlarmLineChartData = (selectedPeriod: PeriodType) => {
    const chartData = useMemo(() => {
        return generateAlarmChartData(selectedPeriod);
    }, [selectedPeriod]);

    return chartData;
}