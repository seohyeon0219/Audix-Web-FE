import { useState } from "react";
import { TooltipState, ProcessNode } from "@/types/konva/index";
import { AREA_CANVAS_CONFIG } from "@/config/konva/index";

// areaCanvas tooltip 관리
export const useAreaTooltip = () => {
    const [tooltip, setTooltip] = useState<TooltipState>(AREA_CANVAS_CONFIG.tooltip.initialState);

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
        setTooltip(AREA_CANVAS_CONFIG.tooltip.initialState);
    };

    return { tooltip, showTooltip, hideTooltip };
}


// factoryCanvas tooltip 관리
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
