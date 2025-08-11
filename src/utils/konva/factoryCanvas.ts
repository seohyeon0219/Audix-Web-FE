import { ProcessNode } from "@/types/konva/index";

// 레벨별 스타일 정의 함수
export const getNodeStyle = (level: ProcessNode['level']) => {
    switch (level) {
        case 'factory':
            return {
                fill: '#303957',
                stroke: '#ffffff',
                strokeWidth: 2,
                textColor: '#ffffff'
            };
        case 'process':
            return {
                fill: '#ffffff',
                stroke: '#333333',
                strokeWidth: 1,
                textColor: '#333333'
            };
        default:
            return {
                fill: '#ffffff',
                stroke: '#333333',
                strokeWidth: 1,
                textColor: '#333333'
            };
    };
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
        process: '/area/1',
        material: '/area/2',
        painting: '/area/3',
        assembly: '/area/4'
    };
    return routeMap[nodeId] || null;
}