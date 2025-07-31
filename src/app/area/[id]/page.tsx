'use client';

import { useState, useEffect } from "react";
// import AreaCanvas from "../../../components/konva/areaCanvas";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

// 동적 import로 AreaCanvas 로드하기 (SSR 비활성화)
const AreaCanvas = dynamic(() => import ("../../../components/konva/areaCanvas"), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center h-96 rounded-lg">
            <div className="text-white">지도를 불러오는 중</div>
        </div>
    )
});

export default function MapPage() {
    const params = useParams();

    return (
        <div>
            <AreaCanvas 
                areaId={params.id as string}
                width={1000}
                height={500}
            />
        </div>
    )
}