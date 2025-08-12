import { useRouter } from "next/navigation";
import { ProcessNode } from "@/types/konva/index";
import { getLevelLabel, getRouteByNodeId } from "@/utils/konva/index";

// factoryCanvas node 핸들러
// 라우팅
export const useFactoryNodeRouter = () => {
    const router = useRouter();

    // 노드 클릭 시 ID에 맞는 경로로 페이지 이동
    const handleNodeClick = (nodeId: string) => {
        const route = getRouteByNodeId(nodeId);
        if (route) {
            router.push(route);
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