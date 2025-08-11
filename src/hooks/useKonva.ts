import { useState } from "react";
import { useRouter } from "next/navigation";
import { TooltipState, ProcessNode } from "@/lib/konva/types";
import { CANVAS_CONFIG } from "@/lib/konva/config";
import { combineDevicesWithPositions, findDeviceById, getAreaLayout, getLevelLabel, getRouteByNodeId } from "@/lib/konva/utils";

// areaCanvas
export const useTooltip = () => {
    const [tooltip, setTooltip] = useState<TooltipState>(CANVAS_CONFIG.tooltip.initialState);

    const showTooltip = (x: number, y: number, data: any, type?: 'device' | 'conveyor') => {
        setTooltip({
            visible: true,
            x,
            y,
            data,
            type
        })
    }

    const hideTooltip = () => {
        setTooltip(CANVAS_CONFIG.tooltip.initialState);
    };

    return { tooltip, showTooltip, hideTooltip };
}

export const useHandlers = (areaId: string) => {
    const router = useRouter();

    const handleClick = (deviceId: string) => {
        router.push(`/area/${areaId}/device/${deviceId}`);
    };

    const handleHover = (deviceId: string, x: number, y: number, showTooltip: (x: number, y: number, data: any) => void) => {
        const device = findDeviceById(deviceId);
        if (device) {
            showTooltip(x, y, {
                name: device.name,
                model: device.model,
                status: device.status
            });
        }
    };

    const handleMouseEnter = (
        e: any,
        deviceId: string,
        onHover?: (deviceId: string, x: number, y: number) => void
    ) => {
        const pos = e.target.getStage()?.getPointerPosition();
        if (pos && onHover) {
            onHover(deviceId, pos.x, pos.y);
        }
    };

    const handleMouseLeave = (onLeave?: () => void) => {
        onLeave?.();
    };

    return { handleClick, handleHover, handleMouseEnter, handleMouseLeave };
}

export const useAreaData = (areaId: string) => {
    const areaIdNum = parseInt(areaId);
    const devicesWithPositions = combineDevicesWithPositions(areaIdNum);
    const areaLayout = getAreaLayout(areaIdNum);

    return { devicesWithPositions, areaLayout };
}


// conveyorLine
export const useConveyorHandlers = () => {
    const handleMouseEnter = (
        e: any,
        onHover?: (type: string, x: number, y: number) => void
    ) => {
        const pos = e.target.getStage()?.getPointerPosition();
        if (pos && onHover) {
            onHover('conveyor', pos.x, pos.y);
        }
    };

    const handleMouseLeave = (onLeave?: () => void) => {
        onLeave?.();
    };

    return { handleMouseEnter, handleMouseLeave };
}


// factoryCanvas
export const useFactoryTooltip = () => {
    const [tooltip, setTooltip] = useState({
        visible: false,
        x: 0,
        y: 0,
        data: { name: '', level: ''}
    });

    const showTooltip = (name: string, level: string, x: number, y: number) => {
        setTooltip({ visible: true, x, y, data: { name, level } });
    };

    const hideTooltip = () => {
        setTooltip(prev => ({ ...prev, visible: false }));
    };

    return { tooltip, showTooltip, hideTooltip };
}

export const useFactoryNodeHandlers = () => {
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