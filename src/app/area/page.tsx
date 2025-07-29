import SearchBar from "../../components/common/searchBar";
import AreaList from "../../components/areaMonitoring/areaList";
import RecentDashboard from "../../components/areaMonitoring/recentDashboard";
import AlarmDashboard from "@/components/areaMonitoring/alarmDashboard";

export default function AreaPage() {
    return (
        <div>
            {/* 윗 부분 */}
            <div className="flex gap-10 mb-10">
                {/* 최근 10일 대시보드 */}
                <RecentDashboard />
                {/* 이번 달 알람 건수 */}
                <AlarmDashboard />
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