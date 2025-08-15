// areaCard
import { useRouter } from "next/navigation";
import { getStatusStyleFromString } from '@/utils/statusUtils';
import { useAreaHover } from "@/contexts/areaHover";
import { AreaCardProps } from "@/types/props/areaCard";
import { api } from "@/constants/api";

export const useAreaCard = ({ data, onClick }: AreaCardProps) => {
    const router = useRouter();
    const { setHoveredAreaId } = useAreaHover();

    // 상세 스타일 가져오기
    const statusStyle = getStatusStyleFromString(data.status);

    // 클릭 핸들러 
    const handleClick = async () => {
        // API 호출: 해당 area의 device 목록 가져오기
        try {
            console.log(`🔄 Area ${data.id}의 장비 목록 가져오는 중...`);
            const result = await api.device.getDevicesByArea(data.id);

            if (result.success) {
                console.log(`✅ Area ${data.id} 장비 목록:`, result.data);
            } else {
                console.warn(`⚠️ Area ${data.id} 장비 목록 가져오기 실패:`, result.error);
            }
        } catch (error) {
            console.error(`❌ Area ${data.id} 장비 목록 API 호출 중 오류:`, error);
        }

        // 페이지 이동
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

