// areaCard
import { useRouter } from "next/navigation";
import { getStatusStyleFromString } from '@/utils/statusUtils';
import { useAreaHover } from "@/contexts/areaHover";
import { AreaCardProps } from "@/types/props/areaCard";

export const useAreaCard = ({ data, onClick }: AreaCardProps) => {
    const router = useRouter();
    const { setHoveredAreaId } = useAreaHover();

    // 상세 스타일 가져오기
    const statusStyle = getStatusStyleFromString(data.status);

    // 클릭 핸들러 
    const handleClick = () => {
        router.push(`/area/${data.id}`);
    }

    // 엔터 핸들러
    const handleMouseEnter = () => {
        setHoveredAreaId(data.id);
    }

    // 리브 핸들러
    const handleMouseLeave = () => {
        setHoveredAreaId(null);
    }
    
    return {
        statusStyle,
        handleClick,
        handleMouseEnter,
        handleMouseLeave
    }
}

