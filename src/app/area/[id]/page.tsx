'use client';

import { useState, useEffect } from "react";
// import AreaCanvas from "../../../components/konva/areaCanvas";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { mockAreaCardData } from "../../../components/areaMonitoring/areaCard";
import { use } from "react";

// 동적 import로 AreaCanvas 로드하기 (SSR 비활성화)
const AreaCanvas = dynamic(() => import ("../../../components/konva/areaCanvas"), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center h-96 rounded-lg">
            <div className="text-white">지도를 불러오는 중</div>
        </div>
    )
});

// id로 구역 이름 찾는 함수
const getAreaName = (id: string) => {
    const area = mockAreaCardData.find(area => area.id === parseInt(id));
    return area?.name;
}

interface MapPageProps {
    params: Promise<{ id: string }>;
}

export default function MapPage({ params }: MapPageProps) {
    const { id } = use(params);
    const areaName = getAreaName(id);

    return (
        <div>
            {/* 상단 구역명 */}
            <header className="flex items-center w-full h-20 border-2 border-main-100">
                <h1 className="border-l-2 border-white text-white text-xl ml-4 pl-8">{areaName} 구조도</h1>
            </header>
            {/* 하단 지도 */}
            <div className="w-full mt-6">
                <AreaCanvas 
                    areaId={id}
                    width={1000}
                    height={500}
                />
            </div>
        </div>
    )
}