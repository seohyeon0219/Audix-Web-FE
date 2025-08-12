import { useMemo } from "react";
import { getNodeStyle } from "@/utils/konva";
import { ProcessNode, NodeStyle } from "@/types/konva";
import { getStatusStyleFromString } from "@/utils/statusUtils";

// 공장 전체 구조도에서 특정 구역에 마우스 호버 시, 해당 area의 노드는 강조하고 나머지는 비활성화 처리
export const useAreaHighlighted = (nodes: ProcessNode[], hoveredAreaId: number | null) => {

    // nodes나 hoveredAreaId가 변경될 때만 로직 실행
    const nodeStyles = useMemo(() => {
        const styles: Record<string, NodeStyle> = {};

        nodes.forEach(node => {
            // 노드 기본 스타일 (fill, textColor, strokeWidth)
            const baseStyle = getNodeStyle(node.level);
            // 상태에 따른 테두리 색 가져오기
            const statusStyle = getStatusStyleFromString(node.status);

            // 호버된 구역이 있고 현재 노드가 그 구역이라면 강조
            if (hoveredAreaId !== null && node.areaId === hoveredAreaId) {
                styles[node.id] = {
                    ...baseStyle,
                    fill: '#ffffff',
                    stroke: statusStyle.hexColor,
                    strokeWidth: 5,
                    textColor: '#333333'
                };
            } else {
                // 호버된 구역이 있는데 현재 노드가 그 구역이 아닐 때
                if (hoveredAreaId !== null) {
                    styles[node.id] = {
                    ...baseStyle,
                    fill: '#666666',
                    stroke: '#666666'
                    };
                } else {
                    // 호버된 구역이 없을 때
                    styles[node.id] = {
                    ...baseStyle,
                    stroke: statusStyle.hexColor, // 테두리는 상태 색상 사용
                };
                }
                
            }
        });

        return styles;
    }, [nodes, hoveredAreaId]);

    return nodeStyles;
}