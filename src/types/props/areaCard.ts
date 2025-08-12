import { AreaData } from "@/types/models/area";

// areaCard
export interface AreaCardProps {
    data: AreaData;
    onClick?: (areaId: string) => void;
}