import { useMemo } from "react";
import { getNodeStyle } from "@/utils/konva";
import { ProcessNode, NodeStyle } from "@/types/konva";

// 공장 전체 구조도에서 특정 구역에 마우스 호버 시, 해당 area의 노드는 강조하고 나머지는 비활성화 처리
export const useAreaHighlighted = (nodes: ProcessNode[], hoveredAreaId: number | null) => {

    // nodes나 hoveredAreaId가 변경될 때만 로직 실행
    const nodeStyles = useMemo(() => {
        const styles: Record<string, NodeStyle> = {};

        nodes.forEach(node => {
            // 노드 기본 스타일
            const baseStyle = getNodeStyle(node.level);

            // 호버된 구역이 없을 때 모든 노드에 기본 스타일 적용
            if (hoveredAreaId === null) {
                styles[node.id] = baseStyle;
                return;
            }

            // 호버된 구역 강조
            if (node.areaId === hoveredAreaId) {
                styles[node.id] = {
                    ...baseStyle,
                    fill: '#FFFFFF',
                    stroke: '#FFFFFF',
                    strokeWidth: 3,
                    textColor: '#333333'
                };
            // 호버되지 않은 구역은 비활성화
            } else {
                styles[node.id] = {
                    ...baseStyle,
                    fill: '#E0E0E0',
                    stroke: '#CCCCCC',
                    strokeWidth: 0.6,
                    textColor: '#888888'
                };
            }
        });

        return styles;
    }, [nodes, hoveredAreaId]);

    return nodeStyles;
}