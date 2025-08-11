import { AreaData } from "@/types/models/area";

// areaCard
export interface AreaCardProps {
    data: AreaData;
    index: number;
    onClick?: (areaId: string) => void;
}