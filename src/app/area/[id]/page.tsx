'use client';

import dynamic from "next/dynamic";
import { MockAreaData, MockDeviceData } from "@/mocks";
import { use } from "react";
import { useSearchArea } from "@/hooks/konva/useSearchArea";
import { useSearchDevices } from "@/hooks/konva/useSearchDevice";

// 동적 import로 AreaCanvas 로드하기 (SSR 비활성화)
const AreaCanvas = dynamic(() => import ("@/components/konva/areaCanvas"), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center h-96 rounded-lg">
            <div className="text-white">지도를 불러오는 중</div>
        </div>
    )
});

interface MapPageProps {
    params: Promise<{ id: string }>;
}

export default function MapPage({ params }: MapPageProps) {
    const { id: areaId } = use(params);
    // 구역 정보 찾기
    const { area } = useSearchArea(areaId);

    // 장비 정보 찾기 (여러 개)
    const { devices } = useSearchDevices(areaId);

    if (!area) {
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="text-white text-center">
                    <h1 className="text-2xl mb-4">구역을 찾을 수 없습니다.</h1>
                </div>
            </div>
        )
    }

    return (
        <div>
            {/* 상단 구역명 */}
            <header className="flex items-center w-full h-20">
                <h1 className="border-l-2 border-white text-white text-xl ml-4 pl-8">{area.name}</h1>
            </header>
            {/* 하단 지도 */}
            <div className="w-full mt-6">
                <AreaCanvas 
                    areaId={areaId}
                    width={1000}
                    height={500}
                />
            </div>
        </div>
    )
}