import { LayoutNode, ProcessNode, Connection } from "@/types/konva";

// 공장 레이아웃 노드
// export const layoutNodes: LayoutNode[] = [
//     {
//         id: 'layout1',
//         name: '3공장',
//         x: 50,
//         y: 50,
//         width: 180,
//         height: 300,
//         level: 'factory'
//     },
//     {
//         id: 'layout2',
//         name: '3-1라인',
//         x: 300,
//         y: 50,
//         width: 500,
//         height: 300,
//         level: 'factory'
//     }
// ];

// 공장 프로세스 노드
export const processNodes: ProcessNode[] = [
    {
        id: 'process1',
        name: '3공장 프레스 구역',
        points: [
            { x: 50, y: 50 },
            { x: 300, y: 50 },
            { x: 210, y: 350 },
            { x: 50, y: 300 },
        ],
        level: 'process',
        areaId: 1,
        address: '울산 현대자동차 31라인',
        status: 'normal',
    },
    {
        id: 'process2',
        name: '차체 31라인',
        points: [
            { x: 320, y: 50 },
            { x: 460, y: 85 },
            // { x: 500, y: 200 },
            { x: 470, y: 350 },
            { x: 330, y: 350 },
            { x: 280, y: 200 },
        ],
        level: 'process',
        areaId: 2,
        address: '울산 현대자동차 31라인',
        status: 'normal',
    },
    {
        id: 'process3',
        name: '도장 31라인',
        points: [
            { x: 480, y: 85 },
            { x: 700, y: 95 },
            { x: 720, y: 160 },
            { x: 550, y: 170 },
            { x: 540, y: 350 },
            { x: 500, y: 350 }
        ],
        level: 'process',
        areaId: 3,
        address: '울산 현대자동차 31라인',
        status: 'warning',
    },
    {
        id: 'process4',
        name: '의장 31라인',
        points: [
            { x: 720, y: 90 },
            { x: 850, y: 120 },
            { x: 890, y: 180 },
            { x: 780, y: 350 },
            { x: 560, y: 350 },
            { x: 570, y: 190 },
            { x: 750, y: 180 },
        ],
        level: 'process',
        areaId: 4,
        address: '울산 현대자동차 31라인',
        status: 'danger',
    },
]


// 공장 연결선
export const factoryConnections: Connection[] = [
    {
        from: { x: 230, y: 140 },
        to: { x: 295, y: 140 }
    }
]