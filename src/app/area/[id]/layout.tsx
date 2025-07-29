'use client';

import { mockAreaCardData } from "../../../components/areaMonitoring/areaCard";

interface MapLayoutProps {
    children: React.ReactNode;
    params: { id: string };
}

// id로 구역 이름 찾는 함수
const getAreaName = (id: string) => {
    const area = mockAreaCardData.find(area => area.id === parseInt(id));
    return area?.name;
}

export default function MapLayout({ children, params }: MapLayoutProps) {
    const areaName = getAreaName(params.id);
    return (
        <div>
            {/* 상단 구역명 */}
            <header className="flex items-center w-4/5 h-20 border-2 border-main-100">
                <h1 className="border-l-2 border-white text-white text-xl ml-4 pl-8">{areaName} 구조도</h1>
            </header>
            {/* 하단 지도 */}
            <main className="w-4/5 mt-6">
                {children}
            </main>
        </div>
    )
}