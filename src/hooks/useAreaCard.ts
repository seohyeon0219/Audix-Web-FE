// areaCard
import { useRouter } from "next/navigation";
import { getStatusStyleFromString } from '@/utils/statusUtils';
import { useAreaHover } from "@/contexts/areaHover";
import { AreaCardProps } from "@/types/props/areaCard";
import { updateMockDeviceDataByArea } from "@/mocks";

export const useAreaCard = ({ data, onClick }: AreaCardProps) => {
    const router = useRouter();
    const { setHoveredAreaId } = useAreaHover();

    // 상세 스타일 가져오기
    const statusStyle = getStatusStyleFromString(data.status);

    // 클릭 핸들러 
    const handleClick = async () => {
        // API 호출해서 MockDeviceData 업데이트
        try {
            console.log(`🔄 Area ${data.id} 클릭 - 장비 데이터 업데이트 중...`);
            const success = await updateMockDeviceDataByArea(data.id);

            if (success) {
                console.log(`✅ Area ${data.id} 장비 데이터 업데이트 성공`);
            } else {
                console.warn(`⚠️ Area ${data.id} 장비 데이터 업데이트 실패`);
            }
        } catch (error) {
            console.error(`❌ Area ${data.id} 장비 데이터 업데이트 중 오류:`, error);
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

