import { AreaData } from "@/types/mocks";

// areaCard
export interface AreaCardProps {
    data: AreaData;
    index: number;
    onClick?: (areaId: string) => void;
}

// areaCanvas
export interface AreaCanvasProps {
    areaId: string; // 어떤 구역인지 식별
    width?: number; // 캔버스 가로 크기
    height?: number; // 캔버스 세로 크기
}