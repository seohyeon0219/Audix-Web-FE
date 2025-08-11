import { useState, useMemo } from "react";
import { CartesianGrid, LineChart, ResponsiveContainer, XAxis, YAxis, Legend, Line } from "recharts";
import { LinesChartProps } from "@/types/recharts/common";
import { PERIOD_BUTTONS, BUTTON_STYLES, CHART_STYLES, CHART_DOMAINS, CHART_CONTAINER, RESPONSIVE_CONTAINER, VALUE_LINE_CHART_LABELS } from "@/config/recharts";
import { useChartPeriod, useValueLineChartData } from "@/hooks/recharts";
import { PeriodButtons } from "@/types/recharts/common";
import { STATUS_STYLES } from "@/constants/status";

const ValueLineChart: React.FC<LinesChartProps> = ({
    title = VALUE_LINE_CHART_LABELS.value.title
}) => {
    const { selectedPeriod, handlePeriodChange } = useChartPeriod();
    const chartData = useValueLineChartData(selectedPeriod);

    return (
        <div className={CHART_CONTAINER.wrapper}>
            <div className={CHART_CONTAINER.headerWrapper}>
                <div>
                    <h3 className={CHART_CONTAINER.titleStyle}>정상도 그래프</h3>
                </div>
                <div className={CHART_CONTAINER.buttonWrapper}>
                    {PERIOD_BUTTONS.map(({ key, label }: PeriodButtons) => (
                        <button
                            key={key}
                            onClick={() => handlePeriodChange(key)}
                            className={`${BUTTON_STYLES.base} ${
                                selectedPeriod === key
                                    ? BUTTON_STYLES.active
                                    : BUTTON_STYLES.inactive
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                </div>
                <div className={CHART_CONTAINER.chartWrapper}>
                <ResponsiveContainer width={RESPONSIVE_CONTAINER.width} height={RESPONSIVE_CONTAINER.height}>
                        <LineChart
                            data={chartData}
                            margin={CHART_STYLES.margin}
                        >
                            <CartesianGrid
                            strokeDasharray={CHART_STYLES.grid.strokeDasharray}
                            stroke={CHART_STYLES.grid.stroke}
                            horizontal={CHART_STYLES.grid.horizontal}
                            vertical={CHART_STYLES.grid.vertical}
                            />
                            <XAxis
                            dataKey="period"
                            axisLine={CHART_STYLES.axis.axisLine}
                            tickLine={CHART_STYLES.axis.tickLine}
                            tick={CHART_STYLES.axis.tick}
                            className={CHART_STYLES.axis.className}
                            />
                            <YAxis
                                axisLine={CHART_STYLES.axis.axisLine}
                                tickLine={CHART_STYLES.axis.tickLine}
                                tick={CHART_STYLES.axis.tick}
                                tickFormatter={VALUE_LINE_CHART_LABELS.value.yAxisFormatter}
                                domain={CHART_DOMAINS.value}
                                className={CHART_STYLES.axis.className}
                            />
                            <Legend
                                verticalAlign={CHART_STYLES.legend.verticalAlign}
                                height={CHART_STYLES.legend.height}
                                iconType={CHART_STYLES.legend.iconType}
                                wrapperStyle={CHART_STYLES.legend.wrapperStyle}
                            />
                            {/* 정상도 라인 */}
                            <Line
                                type={CHART_STYLES.line.type}
                                dataKey="value"
                                stroke={STATUS_STYLES.NORMAL.hexColor}
                                strokeWidth={CHART_STYLES.line.strokeWidth}
                                dot={{ 
                                    fill: STATUS_STYLES.NORMAL.hexColor, 
                                    strokeWidth: CHART_STYLES.line.dot.strokeWidth,
                                    r: CHART_STYLES.line.dot.r
                                }}
                                name={VALUE_LINE_CHART_LABELS.value.lineName}
                                activeDot={{
                                    r: CHART_STYLES.line.dot.r,
                                    fill: STATUS_STYLES.NORMAL.hexColor,
                                    stroke: STATUS_STYLES.NORMAL.hexColor,
                                    strokeWidth: CHART_STYLES.line.activeDot.strokeWidth,
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
}

export default ValueLineChart;