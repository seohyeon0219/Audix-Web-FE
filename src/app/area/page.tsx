'use client';

import dynamic from "next/dynamic";
import AreaList from "@/components/areaMonitoring/areaList";
import RecentDashboard from "@/components/areaMonitoring/recentDashboard";
import AlarmDashboard from "@/components/areaMonitoring/alarmDashboard";
import { AreaHoverProvider } from "@/contexts/areaHover";

// 동적 import로 FactoryCanvas 로드하기 (SSR 비활성화)
const LoadingFactoryCanvas = dynamic(() => import("@/components/konva/factoryCanvas"), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center h-96 rounded-lg bg-main-100">
            <div className="text-white">공장 구조를 불러오는 중</div>
        </div>
    )
})

export default function AreaPage() {

    return (
        <AreaHoverProvider>
            {/* 윗 부분 */}
            <div className="flex items-start gap-10 mb-8 h-28">
                {/* 최근 10일 대시보드 */}
                <RecentDashboard />
                {/* 이번 달 알람 건수 */}
                <AlarmDashboard />
            </div>
            {/* 아랫 부분 (전 구역 모니터링) */}
            <div className="flex-1 bg-main-500 p-6 border border-t-white max-w-7xl">
                {/* 전 구역 모니터링 제목 */}
                <div className="mb-6">
                    <h1 className="text-white">전 구역 모니터링</h1>
                </div>
                {/* 구역 카드 리스트 + 공장 구조도 */}
                <div className="flex gap-8">
                    {/* 구역 카드 리스트 */}
                    <div className="flex-shrink-0">
                        <AreaList />
                    </div>
                    {/* 공장 구조도 */}
                    <div className="flex-1 bg-main-100 p-4 max-w-5xl">
                        <LoadingFactoryCanvas width={900} height={400} />
                    </div>
                </div>
            </div>
        </AreaHoverProvider>
    )
}