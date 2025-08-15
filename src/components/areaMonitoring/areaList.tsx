'use client';

import { useState, useEffect, useMemo } from "react";
import { MockAreaData } from "@/mocks/areaData"; // 기존 방식 사용
import AreaCard from "@/components/areaMonitoring/areaCard";
import { STATUS_STYLES } from "@/constants/status";
import { AreaData } from "@/types/models/area";

export default function AreaList() {
    const [areas, setAreas] = useState<AreaData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 🔧 수정: 단순화된 useEffect - 한 번만 실행
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

        // 🔧 개선: MockAreaData 변경 감지를 위한 커스텀 이벤트 리스너
        const handleMockDataUpdate = () => {
            loadAreas();
        };

        // 커스텀 이벤트 리스너 등록 (옵션)
        window.addEventListener('mockAreaDataUpdated', handleMockDataUpdate);

        return () => {
            window.removeEventListener('mockAreaDataUpdated', handleMockDataUpdate);
        };
    }, []); // 🔧 핵심: 빈 의존성 배열로 한 번만 실행

    // 🔧 수정: 정렬 로직을 useMemo로 최적화
    const sortedAreas = useMemo(() => {
        return [...areas].sort((a, b) => {
            const statusA = a.status || 'offline';
            const statusB = b.status || 'offline';

            // STATUS_STYLES에서 priority 찾기
            const priorityA = Object.values(STATUS_STYLES).find(style => style.status === statusA)?.priority || 999;
            const priorityB = Object.values(STATUS_STYLES).find(style => style.status === statusB)?.priority || 999;
            return priorityA - priorityB;
        });
    }, [areas]);

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