import { useState } from "react";
import { useRouter } from "next/navigation";
import { TooltipState, ProcessNode } from "@/types/konva/index";
import { combineDevicesWithPositions, findDeviceById, getAreaLayout, getLevelLabel, getRouteByNodeId } from "@/utils/konva/index";

// factoryCanvas node 핸들러
// 라우팅
export const useFactoryNodeRouter = () => {
    const router = useRouter();

    const handleNodeClick = (nodeId: string) => {
        const route = getRouteByNodeId(nodeId);
        if (route) {
            router.push(route);
        }
    };

    const handleNodeHover = (
        node: ProcessNode,
        x: number,
        y: number,
        showTooltip: (name: string, level: string, x: number, y: number) => void
    ) => {
        const levelLabels = getLevelLabel(node.level);
        showTooltip(node.name, levelLabels, x, y);
    };

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