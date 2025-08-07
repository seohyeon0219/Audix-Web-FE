import { AreaData } from "@/types/mocks";

// areaCard
export interface AreaCardProps {
    data: AreaData;
    index: number;
    onClick?: (areaId: string) => void;
}
