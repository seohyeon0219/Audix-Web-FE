import { ProcessNode } from "@/types/konva/index";
import { NodeStyle } from "@/types/konva/index";

// 공장 전체 맵에서 기본 색 지정
export const getNodeStyle = (level: ProcessNode['level']): NodeStyle => {
    return {
        fill: '#EFEFEF',
        stroke: '', // 임시값, 어차피 훅에서 덮어쓰게 됩니다.
        strokeWidth: 3, // 기본 테두리 두께
        textColor: '#333333'
    }
}

// 레벨 라벨
export const getLevelLabel = (level: ProcessNode['level']): string => {
    const levelLabels = {
        factory: '공장',
        line: '라인',
        process: '공정',
        material: '차체'
    };
    return levelLabels[level] || '알 수 없음';
}

// 노트 ID를 라우트로 변환
export const getRouteByNodeId = (nodeId: string): string | null => {
    const routeMap: Record<string, string> = {
        process1: '/area/1',
        process2: '/area/3',
        process3: '/area/4',
        process4: '/area/5'
    };
    return routeMap[nodeId] || null;
}