import { useState, useMemo } from "react";
import { CartesianGrid, LineChart, ResponsiveContainer, XAxis, YAxis, Legend, Line } from "recharts";
import { LinesChartProps } from "@/types/recharts/common";
import { PERIOD_BUTTONS, BUTTON_STYLES, LINE_CHART_STYLES, LINE_CHART_DOMAINS, LINE_CHART_CONTAINER, RESPONSIVE_CONTAINER, VALUE_LINE_CHART_LABELS } from "@/config/recharts";
import { useChartPeriod, useValueLineChartData } from "@/hooks/recharts";
import { PeriodButtons } from "@/types/recharts/common";
import { STATUS_STYLES } from "@/constants/status";

const ValueLineChart: React.FC<LinesChartProps> = ({
    title = VALUE_LINE_CHART_LABELS.value.title
}) => {

    const { selectedPeriod, handlePeriodChange } = useChartPeriod();
    const chartData = useValueLineChartData(selectedPeriod);

    return (
        <div className={LINE_CHART_CONTAINER.wrapper}>
            <div className={LINE_CHART_CONTAINER.headerWrapper}>
                <div>
                    <h3 className={LINE_CHART_CONTAINER.titleStyle}>{title}</h3>
                </div>
                <div className={LINE_CHART_CONTAINER.buttonWrapper}>
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
                <div className={LINE_CHART_CONTAINER.chartWrapper}>
                <ResponsiveContainer width={RESPONSIVE_CONTAINER.width} height={RESPONSIVE_CONTAINER.height}>
                        <LineChart
                            data={chartData}
                            margin={LINE_CHART_STYLES.margin}
                        >
                            <CartesianGrid
                            strokeDasharray={LINE_CHART_STYLES.grid.strokeDasharray}
                            stroke={LINE_CHART_STYLES.grid.stroke}
                            horizontal={LINE_CHART_STYLES.grid.horizontal}
                            vertical={LINE_CHART_STYLES.grid.vertical}
                            />
                            <XAxis
                            dataKey="period"
                            axisLine={LINE_CHART_STYLES.axis.axisLine}
                            tickLine={LINE_CHART_STYLES.axis.tickLine}
                            tick={LINE_CHART_STYLES.axis.tick}
                            className={LINE_CHART_STYLES.axis.className}
                            />
                            <YAxis
                                axisLine={LINE_CHART_STYLES.axis.axisLine}
                                tickLine={LINE_CHART_STYLES.axis.tickLine}
                                tick={LINE_CHART_STYLES.axis.tick}
                                tickFormatter={VALUE_LINE_CHART_LABELS.value.yAxisFormatter}
                                domain={LINE_CHART_DOMAINS.value}
                                className={LINE_CHART_STYLES.axis.className}
                            />
                            <Legend
                                verticalAlign={LINE_CHART_STYLES.legend.verticalAlign}
                                height={LINE_CHART_STYLES.legend.height}
                                iconType={LINE_CHART_STYLES.legend.iconType}
                                wrapperStyle={LINE_CHART_STYLES.legend.wrapperStyle}
                            />
                            {/* 정상도 라인 */}
                            <Line
                                type={LINE_CHART_STYLES.line.type}
                                dataKey="value"
                                stroke={STATUS_STYLES.NORMAL.hexColor}
                                strokeWidth={LINE_CHART_STYLES.line.strokeWidth}
                                dot={{ 
                                    fill: STATUS_STYLES.NORMAL.hexColor, 
                                    strokeWidth: LINE_CHART_STYLES.line.dot.strokeWidth,
                                    r: LINE_CHART_STYLES.line.dot.r
                                }}
                                name={VALUE_LINE_CHART_LABELS.value.lineName}
                                activeDot={{
                                    r: LINE_CHART_STYLES.line.dot.r,
                                    fill: STATUS_STYLES.NORMAL.hexColor,
                                    stroke: STATUS_STYLES.NORMAL.hexColor,
                                    strokeWidth: LINE_CHART_STYLES.line.activeDot.strokeWidth,
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
}

export default ValueLineChart;