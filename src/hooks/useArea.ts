// areaCard
import { useRouter } from "next/navigation";
import { getStatusStyleFromString } from '@/utils/statusUtils';
import { AreaData } from "@/types/mocks";

export const useAreaCard = (data: AreaData) => {
    const router = useRouter();

    // 상세 스타일 가져오기
    const statusStyle = getStatusStyleFromString(data.status);

    // 클릭 핸들러 
    const handleClick = () => {
        router.push(`/area/${data.id}`);
    }
    
    return {
        statusStyle,
        handleClick
    }
}

