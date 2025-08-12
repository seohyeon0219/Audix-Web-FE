import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { DevicePieChartProps } from '@/types/recharts';
import { useDevicePieChart } from '@/hooks/recharts';
import { RESPONSIVE_CONTAINER, PIE_CHART_STYLES, PIE_CHART_COLORS_GRAY, PIE_CHART_CONTAINER } from '@/config/recharts';

const DevicePieChart: React.FC<DevicePieChartProps> = ({
    areaId,
    deviceId,
    title
}) => {

    const { device, chartData } = useDevicePieChart(areaId, deviceId);

    // device이 없는 경우 처리
    if (!device) {
        return (
            <div className={PIE_CHART_CONTAINER.wrapper}>
                <h2 className={PIE_CHART_CONTAINER.titleStyle}>
                    {title}
                </h2>
                <p className='text-white'>장비를 찾을 수 없습니다.</p>
            </div>
        )
    }

    // device.value가 없는 경우 처리
    if (device.normalScore === undefined) {
        return (
            <div className={PIE_CHART_CONTAINER.wrapper}>
                <h2 className={PIE_CHART_CONTAINER.titleStyle}>
                    {title}
                </h2>
                <p className='text-white mt-1'>데이터가 없습니다.</p>
            </div>
        )
    }

    const { data, colors, percentage } = chartData!;

    return (
        <div className={PIE_CHART_CONTAINER.wrapper}>
            <h2 className={PIE_CHART_CONTAINER.titleStyle}>
                {title}
            </h2>
            <div className='flex'>
                <div className={PIE_CHART_CONTAINER.chartSection}>
                    <div className={PIE_CHART_CONTAINER.chartWrapper}>
                        <ResponsiveContainer width={RESPONSIVE_CONTAINER.width} height={RESPONSIVE_CONTAINER.height}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx={PIE_CHART_STYLES.pie.cx}
                                    cy={PIE_CHART_STYLES.pie.cy}
                                    innerRadius={PIE_CHART_STYLES.pie.innerRadius}
                                    outerRadius={PIE_CHART_STYLES.pie.outerRadius}
                                    startAngle={PIE_CHART_STYLES.pie.startAngle}
                                    endAngle={PIE_CHART_STYLES.pie.endAngle}
                                    dataKey={PIE_CHART_STYLES.pie.dataKey}
                                    stroke={PIE_CHART_STYLES.pie.stroke}
                                    animationBegin={PIE_CHART_STYLES.pie.animation.begin}
                                    animationDuration={PIE_CHART_STYLES.pie.animation.duration}
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className={PIE_CHART_STYLES.percentText.wrapper}>
                            <span className={PIE_CHART_STYLES.percentText.text}>{percentage}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DevicePieChart;