'use client';

import { useRouter } from "next/navigation";

type AreaStatus = 'danger' | 'warning' | 'safe' | 'offline' | 'repair';

interface AreaCardData {
    id: number;
    name: string; // 구역명
    location: string; // 위치
    manager: string; // 담당자
    status: AreaStatus; // 구역 상태

}

interface AreaCardProps {
    data: AreaCardData;
    index: number;
    onClick?: (areaId: number) => void;
}

// mock data
export const mockAreaCardData: AreaCardData[] = [
    {
        id: 1,
        name: 'A-2구역',
        location: '인하대학교 5호관 남',
        manager: '이하은',
        status: 'warning'
    },
        {
        id: 2,
        name: 'A-1구역',
        location: '인하대학교 5호관 동',
        manager: '김서현',
        status: 'danger'
    },
        {
        id: 3,
        name: 'B-1구역',
        location: '인하대학교 5호관 서',
        manager: '김현민',
        status: 'safe',
    },
    {
        id: 4,
        name: 'A-3구역',
        location: '인하대학교 5호관 서',
        manager: '김재걸',
        status: 'warning'
    },
    {
        id: 5,
        name: 'B-2구역',
        location: '인하대학교 5호관 북',
        manager: '도종명',
        status: 'safe'
    },
    {
        id: 6,
        name: 'B-3구역',
        location: '인하대학교 6호관 1층',
        manager: '김서현',
        status: 'offline'
    },
    {
        id: 7,
        name: 'B-4구역',
        location: '인하대학교 6호관 2층',
        manager: '이하은',
        status: 'repair'
    },
    {
        id: 8,
        name: 'C-1구역',
        location: '인하대학교 5호관 북',
        manager: '김재걸',
        status: 'safe'
    }
];

// 상태별 스타일 반환 함수
const getStatusStyles = (status: AreaStatus) => {
    switch (status) {
        case 'danger':
            return {
                bgColor: 'bg-danger',
                textColor: 'text-danger',
                label: '위험'
            };
        case 'warning':
            return {
                bgColor: 'bg-warning',
                textColor: 'text-warning',
                label: '점검요망'
            };
        case 'safe':
            return {
                bgColor: 'bg-safe',
                textColor: 'text-safe',
                label: '안전'
            };
        case 'repair':
            return {
                bgColor: 'bg-repair',
                textColor: 'text-repair',
                label: '수리중'
            };
        default:
            return {
                bgColor: 'bg-offline',
                textColor: 'text-offline',
                label: '미연결'
            }
    }
}

export default function AreaCard ({ 
    data, 
    index
}: AreaCardProps) {
    const router = useRouter();
    const statusStyles = getStatusStyles(data.status);

    const handleClick = () => {
        router.push(`/area/${data.id}`);
    };

    return (
        <div
            className="w-60 h-40 bg-main-100 cursor-pointer border-1 border-black p-6"
            onClick={handleClick}
        >
            {/* 상단 : 구역명 + 상태 */}
            <div className="flex justify-between gap-2 mb-4">
                <h3 className="text-white font-black text-xl">{data.name}</h3>
                <div className={`p-2 rounded-sm border border-black ${statusStyles.bgColor}`}>
                    {statusStyles.label}
                </div>
            </div>
            {/* 하단 : 위치 + 담당자 */}
            <div>
                <p className="text-white">{data.location}</p>
                <p className="text-white">담당자 : {data.manager}</p>
            </div>
        </div>
    )
}