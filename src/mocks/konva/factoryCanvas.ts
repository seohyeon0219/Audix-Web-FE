import { LayoutNode, ProcessNode, Connection } from "@/types/konva";

// 공장 레이아웃 노드
export const layoutNodes: LayoutNode[] = [
    {
        id: 'layout1',
        name: '3공장',
        x: 50,
        y: 50,
        width: 180,
        height: 300,
        level: 'factory'
    },
    {
        id: 'layout2',
        name: '3-1라인',
        x: 300,
        y: 50,
        width: 450,
        height: 300,
        level: 'factory'
    }
];

// 공장 프로세스 노드
export const processNodes: ProcessNode[] = [
    {
        id: 'process1',
        name: '프레스동',
        x: 70,
        y: 100,
        width: 140,
        height: 200,
        level: 'process',
        areaId: 1,
        address: '울산 현대자동차 31라인',
        status: 'normal'
    },
    {
        id: 'process2',
        name: '차체동',
        x: 320,
        y: 100,
        width: 140,
        height: 200,
        level: 'process',
        areaId: 2,
        address: '울산 현대자동차 31라인',
        status: 'normal'
    },
    {
        id: 'process3',
        name: '도장공정',
        x: 460,
        y: 100,
        width: 140,
        height: 200,
        level: 'process',
        areaId: 3,
        address: '울산 현대자동차 31라인',
        status: 'warning'
    },
    {
        id: 'process4',
        name: '의장공정',
        x: 600,
        y: 100,
        width: 140,
        height: 200,
        level: 'process',
        areaId: 4,
        address: '울산 현대자동차 31라인',
        status: 'danger'
    },
]


// 공장 연결선
export const factoryConnections: Connection[] = [
    {
        from: { x: 230, y: 140 },
        to: { x: 295, y: 140 }
    }
]