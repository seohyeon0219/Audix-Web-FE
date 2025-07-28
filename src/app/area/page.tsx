import { getStatusFromValue, getStatusColor } from "../../constants/status";

import SearchBar from "../../components/common/searchBar";
// import AreaCard from "../../components/areaMonitoring/areaCard";
import AreaList from "../../components/areaMonitoring/areaList";

// 최근 10일 대시보드
interface RecentDashboardData {
    date: string;
    value: number; // 0.1 ~ 1.0
}

// mock data
const mockRecentDashboardData: RecentDashboardData[] = [
    { date: '2025-01-01', value: 0.9 },
    { date: '2025-01-02', value: 0.8 },
    { date: '2025-01-03', value: 0.7 },
    { date: '2025-01-04', value: 0.6 },
    { date: '2025-01-05', value: 0.5 },
    { date: '2025-01-06', value: 0.4 },
    { date: '2025-01-07', value: 0.4 },
    { date: '2025-01-08', value: 0.2 },
    { date: '2025-01-09', value: 0.1 },
    { date: '2025-01-10', value: 0.1 },
]

// 이번 달 알림 건수 
type DateAlarmType = 'danger' | 'warning';

interface DataAlarmCount {
    danger: number;
    warning: number;
}

// mock data
const mockDateAlarmCounts: DataAlarmCount = {
    danger: 1,
    warning: 5
}

const alarms = [
    {
        key: 'danger' as DateAlarmType,
        label: '위험',
        count: mockDateAlarmCounts.danger,
        textColor: 'text-danger',
        borderColor: 'border-danger'
    },
    {
        key: 'warning' as DateAlarmType,
        label: '점검\n요망',
        count: mockDateAlarmCounts.warning,
        textColor: 'text-warning',
        borderColor: 'border-warning'
    }
]


export default function AreaPage() {
    return (
        <div>
            {/* 윗 부분 */}
            <div className="flex gap-10 mb-10">
                {/* 최근 10일 대시보드 */}
                <div className="bg-main-100 min-w-96 w-fit rounded-lg px-14 py-4 border border-t-white">
                    <h3 className="text-white pb-2 mb-4 border-b border-white">최근 10일 대시보드</h3>
                    <div className="flex gap-3">
                        {mockRecentDashboardData.map((data, index) => {
                            const status = getStatusFromValue(data.value);
                            const colorClass = getStatusColor(status);

                            return (
                                <div 
                                    key={index}
                                    className={`w-6 h-6 rounded cursor-pointer ${colorClass}`}
                                    title={`${data.date}: ${data.value} (${status})`}
                                />
                            )
                        })}

                    </div>
                </div>
                {/* 이번 달 알람 건수 */}
                <div className="flex items-center gap-8 bg-main-100 min-w-96 w-fit rounded-lg px-14 py-4 border border-t-white">
                    <h3 className="text-white border-white">이번 달<br/> 알림 건수</h3>
                    {alarms.map((data, index) => {
                        const borderColor = data.borderColor;
                        const textColor = data.textColor;

                        return (
                            <div key={index} className="flex items-center gap-3">
                                <div 
                                    className={`w-14 h-14 rounded-lg cursor-pointer border flex justify-center items-center text-sm whitespace-pre-line ${textColor} ${borderColor}`}
                                    title={`${data.label}: ${data.count}`}
                                >
                                    {data.label}
                                </div>
                                <div
                                    className={`text-white`}>
                                    {data.count}건
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {/* 아랫 부분 (전 구역 모니터링) */}
            <div className="flex-1 bg-main-500 p-8 border border-t-white">
                {/* 전 구역 모니터링 + 서치 바 */}
                <div className="flex justify-between mb-8">
                    <h1 className="text-2xl font-bold text-white">전 구역 모니터링</h1>
                    <SearchBar
                        placeholder="구역을 검색하세요."
                        iconname="search"
                    />
                </div>
                {/* 구역 카드 리스트 */}
                <AreaList />
            </div>
        </div>
    )
}