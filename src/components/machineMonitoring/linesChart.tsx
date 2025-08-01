import { useState, useMemo } from "react";
import { CartesianGrid, LineChart, ResponsiveContainer, XAxis, YAxis, Legend, Line } from "recharts";

type PeriodType = 'monthly' | 'yearly';
type StatusType = 'danger' | 'warning';

interface ChartDataPoint {
    period: string;
    danger: number;
    warning: number;
}

// mock data (2025년 월별)
const generateMonthlyData2025 = (): ChartDataPoint[] => {
  return [
    { period: '1월', danger: 2, warning: 3 },
    { period: '2월', danger: 0, warning: 4 },
    { period: '3월', danger: 0, warning: 0 },
    { period: '4월', danger: 0, warning: 4 },
    { period: '5월', danger: 1, warning: 0 },
    { period: '6월', danger: 1, warning: 3 },
    { period: '7월', danger: 0, warning: 2 },
    { period: '8월', danger: 0, warning: 1 },
    { period: '9월', danger: 0, warning: 0 },
    { period: '10월', danger: 0, warning: 0 },
    { period: '11월', danger: 1, warning: 4 },
    { period: '12월', danger: 2, warning: 0 }
  ];
};

// mock data (2021~2025 년도별)
const generateYearlyData = (): ChartDataPoint[] => {
    return [
        { period: '2021', danger: 5, warning: 13},
        { period: '2022', danger: 2, warning: 15},
        { period: '2023', danger: 6, warning: 18},
        { period: '2024', danger: 3, warning: 12},
        { period: '2025', danger: 7, warning: 21}
    ]
}

const dataGenerators = {
    monthly: generateMonthlyData2025,
    yearly: generateYearlyData
};

// 기간 선택 버튼
const periodButtons = [
    { key: 'monthly' as PeriodType, label: '월별'},
    { key: 'yearly' as PeriodType, label: '년도별'},
]

// 상태 별 색상 설정
const statusColors = {
    danger: '#FF2F16',
    warning: '#FFC525',
    safe: '#1CAA00'
}

const StatusLabels = {
    danger: '위험',
    warning: '점검 요망',
    safe: '안전'
}

interface StatusLineChartProps {
    title?: string;
}

const StatusLineChart: React.FC<StatusLineChartProps> = ({
    title = '장비 정상도 그래프'
}) => {
    const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('monthly');

    // 선택한 기간에 따른 데이터 생성
    const chartData = useMemo(()=> {
        return dataGenerators[selectedPeriod]();
    }, [selectedPeriod]);

    const handlePeriodChange = (period: PeriodType) => {
        setSelectedPeriod(period);
    };

    return (
        <div className="bg-main-100 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-white text-lg font-medium">장비 정상도 그래프</h3>
                </div>
                <div className="flex gap-2">
                    {periodButtons.map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => handlePeriodChange(key)}
                            className={`px-4 py-2 text-sm rounded transition-colors cursor-pointer ${
                                selectedPeriod === key
                                    ? 'bg-main-500 text-white'
                                    : 'text-white border border-white hover:bg-main-500 hover:text-white'
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
                            tickFormatter={(value) => `${value}건`}
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
                        {/* 위험 라인 */}
                        <Line
                            type='monotone'
                            dataKey="danger"
                            stroke={statusColors.danger}
                            strokeWidth={3}
                            dot={{ fill: statusColors.danger, strokeWidth: 2, r: 5 }}
                            name={StatusLabels.danger}
                            activeDot={{
                                r: 7,
                                fill: statusColors.danger,
                                stroke: statusColors.danger,
                                strokeWidth: 2
                            }}
                        />
                        {/* 점검요망 라인 */}
                        <Line
                            type='monotone'
                            dataKey="warning"
                            stroke={statusColors.warning}
                            strokeWidth={3}
                            dot={{ fill: statusColors.warning, strokeWidth: 2, r: 5 }}
                            name={StatusLabels.warning}
                            activeDot={{
                                r: 7,
                                fill: statusColors.warning,
                                stroke: statusColors.warning,
                                strokeWidth: 2
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StatusLineChart;