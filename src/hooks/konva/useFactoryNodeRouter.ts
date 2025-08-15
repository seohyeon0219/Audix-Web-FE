import { useRouter } from "next/navigation";
import { ProcessNode } from "@/types/konva/index";
import { getLevelLabel, getRouteByNodeId } from "@/utils/konva/index";
import { api } from "@/constants/api";

// factoryCanvas node 핸들러
// 라우팅
export const useFactoryNodeRouter = () => {
    const router = useRouter();

    // 노드 클릭 시 ID에 맞는 경로로 페이지 이동 (웹 카드 클릭 방식과 동일)
    const handleNodeClick = async (nodeId: string) => {
        // nodeId에서 숫자 부분만 추출 (process1 -> 1, process2 -> 2 등)
        const areaId = nodeId.replace(/\D/g, ''); // 숫자가 아닌 문자를 모두 제거

        if (areaId) {
            // API 호출: 해당 area의 device 목록 가져오기
            try {
                console.log(`🔄 Area ${areaId}의 장비 목록 가져오는 중...`);
                const result = await api.device.getDevicesByArea(parseInt(areaId));

                if (result.success) {
                    console.log(`✅ Area ${areaId} 장비 목록:`, result.data);
                } else {
                    console.warn(`⚠️ Area ${areaId} 장비 목록 가져오기 실패:`, result.error);
                }
            } catch (error) {
                console.error(`❌ Area ${areaId} 장비 목록 API 호출 중 오류:`, error);
            }

            // 페이지 이동
            router.push(`/area/${areaId}`);
        } else {
            console.warn(`Invalid nodeId: ${nodeId}`);
        }
    };

    // 노드 호버 시 툴팁에 필요한 데이터를 가공하여 showTooltip 콜백 실행
    const handleNodeHover = (
        node: ProcessNode,
        x: number,
        y: number,
        showTooltip: (name: string, level: string, x: number, y: number) => void
    ) => {
        const levelLabels = getLevelLabel(node.level);
        showTooltip(node.name, levelLabels, x, y);
    };

    // 마우스가 노드 위로 들어왔을 때 onHover 콜백 실행
    const handleMouseEnter = (
        e: any,
        node: ProcessNode,
        onHover: (node: ProcessNode, x: number, y: number) => void
    ) => {
        const pos = e.target.getStage()?.getPointerPosition();
        if (pos) {
            onHover(node, pos.x, pos.y);
        }
    };

    return { handleNodeClick, handleNodeHover, handleMouseEnter };
}