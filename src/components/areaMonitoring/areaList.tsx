'use client';

import { useState, useEffect } from "react";
import { MockAreaData } from "@/mocks";
import AreaCard from "@/components/areaMonitoring/areaCard";
import { STATUS_STYLES } from "@/constants/status";
import { AreaData } from "@/types/models/area";

export default function AreaList() {
    const [areas, setAreas] = useState<AreaData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // MockAreaData 동기화
    useEffect(() => {
        const loadAreas = () => {
            // MockAreaData를 복사해서 사용 (참조 문제 방지)
            const currentAreas = [...MockAreaData];
            setAreas(currentAreas);
            setIsLoading(false);

            console.log('🔄 AreaList 업데이트:', currentAreas);
        };

        // 초기 로드
        loadAreas();

        // MockAreaData 변경 감지를 위한 인터벌 (선택사항)
        const interval = setInterval(() => {
            if (areas.length !== MockAreaData.length ||
                JSON.stringify(areas) !== JSON.stringify(MockAreaData)) {
                loadAreas();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [areas]);
    // mock data와 직접 관련이 있는 유틸 함수이므로 컴포넌트 내에 두기로 함
    // Utils에는 Pure function만 들어가기 때문에 
    // areaCard 상태별 정렬
    const sortedAreas = [...MockAreaData].sort((a, b) => {
        const statusA = a.status || 'offline';
        const statusB = b.status || 'offline';

        // STATUS_STYLES에서 priority 찾기
        const priorityA = Object.values(STATUS_STYLES).find(style => style.status === statusA)?.priority || 999;
        const priorityB = Object.values(STATUS_STYLES).find(style => style.status === statusB)?.priority || 999;
        return priorityA - priorityB;
    });

    if (isLoading) {
        return (
            <div className="text-white text-center py-8">
                <p>구역 데이터를 불러오는 중...</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {sortedAreas.map((area) => (
                <AreaCard
                    key={area.id}
                    data={area}
                />
            ))}
        </div>
    )
}