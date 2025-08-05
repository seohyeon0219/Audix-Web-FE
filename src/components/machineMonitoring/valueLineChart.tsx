import { useState, useMemo } from "react";
import { CartesianGrid, LineChart, ResponsiveContainer, XAxis, YAxis, Legend, Line } from "recharts";
import { STATUS_COLORS, STATUS_LABELS } from "@/constants/statusColor";

type PeriodType = 'monthly' | 'yearly';

interface ChartDataPoint {
    period: string;
    value: number;
}

// mock data (2025년 월별)
const generateMonthlyData2025 = (): ChartDataPoint[] => {
    return [
        { period: '1월', value: 0.8 },
        { period: '2월', value: 0.9 },
        { period: '3월', value: 0.86 },
        { period: '4월', value: 0.7 },
        { period: '5월', value: 0.98 },
        { period: '6월', value: 0.87 },
        { period: '7월', value: 0.85 },
        { period: '8월', value: 0.99 },
        { period: '9월', value: 0.98 },
        { period: '10월', value: 0.87 },
        { period: '11월', value: 0.85 },
        { period: '12월', value: 0.99 },
    ]
}

// mock data (2021~2025 년도별)
const generateYearlyData = (): ChartDataPoint[] => {
    return [
        { period: '2021', value: 0.9 },
        { period: '2022', value: 0.8 },
        { period: '2023', value: 0.97 },
        { period: '2024', value: 0.89 },
        { period: '2025', value: 0.9 },
    ]
}

const dataDenerators = {
    monthly: generateMonthlyData2025,
    yearly: generateYearlyData
}

// 기간 선택 버튼
const periodButtons = [
    { key: 'monthly' as PeriodType, label: '월별' },
    { key: 'yearly' as PeriodType, label: '년도별' }
]

interface ValueLineChartProps {
    title?: string;
}

const ValueLineChart: React.FC<ValueLineChartProps> = ({
    title = '정상도 그래프'
}) => {
    const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('monthly');

    // 선택한 기간에 따른 데이터 생성
    const chartData = useMemo(() => {
        return dataDenerators[selectedPeriod]();
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
                        {periodButtons.map(({ key, label }) => (
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
                                stroke={STATUS_COLORS.safe}
                                strokeWidth={3}
                                dot={{ fill: STATUS_COLORS.safe, strokeWidth: 2, r: 5 }}
                                name="정상도"
                                activeDot={{
                                    r: 7,
                                    fill: STATUS_COLORS.safe,
                                    stroke: STATUS_COLORS.safe,
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