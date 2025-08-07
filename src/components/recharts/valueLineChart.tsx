import { useState, useMemo } from "react";
import { CartesianGrid, LineChart, ResponsiveContainer, XAxis, YAxis, Legend, Line } from "recharts";
import { STATUS_STYLES, getStatusStyleFromString } from "@/utils/statusUtils";
import { PeriodType, ValueChartDataPoint } from "@/types/deviceMonitoring";
import { PERIOD_BUTTONS } from "@/lib/recharts/config";
import { generateValueChartData } from "@/lib/recharts/utils";

interface ValueLineChartProps {
    title?: string;
}

const ValueLineChart: React.FC<ValueLineChartProps> = ({
    title = '정상도 그래프'
}) => {
    const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('monthly');

    // 선택한 기간에 따른 데이터 생성
    const chartData = useMemo(() => {
        return generateValueChartData(selectedPeriod);
    }, [selectedPeriod]);

    const handlePeriodChange = (period: PeriodType) => {
        setSelectedPeriod(period);
    };

    return (
            <div className="bg-main-100 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-white text-lg font-medium">정상도 그래프</h3>
                    </div>
                    <div className="flex gap-2">
                        {PERIOD_BUTTONS.map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => handlePeriodChange(key)}
                                className={`px-4 py-2 text-sm rounded transition-colors cursor-pointer ${
                                    selectedPeriod === key
                                        ? 'bg-main-500 text-white'
                                        : 'text-white hover:bg-main-500 hover:text-white'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20}}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#808080"
                                horizontal={true}
                                vertical={false}
                            />
                            <XAxis
                                dataKey="period"
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: "#9CA3AF",
                                    fontSize: 12
                                }}
                                className="text-xs"
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: "#9CA3AF",
                                    fontSize: 12
                                }}
                                tickFormatter={(value) => `${value}`}
                                domain={[0, 'dataMax']}
                                className="text-xs"
                            />
                            <Legend
                                verticalAlign="top"
                                height={40}
                                iconType="circle"
                                wrapperStyle={{
                                    color: "#9CA3AF",
                                    paddingBottom: '20px'
                                }}
                            />
                            {/* 정상도 라인 */}
                            <Line
                                type='monotone'
                                dataKey="value"
                                stroke={STATUS_STYLES.NORMAL.hexColor}
                                strokeWidth={3}
                                dot={{ fill: STATUS_STYLES.NORMAL.hexColor, strokeWidth: 2, r: 5 }}
                                name="정상도"
                                activeDot={{
                                    r: 7,
                                    fill: STATUS_STYLES.NORMAL.hexColor,
                                    stroke: STATUS_STYLES.NORMAL.hexColor,
                                    strokeWidth: 2
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
}

export default ValueLineChart;