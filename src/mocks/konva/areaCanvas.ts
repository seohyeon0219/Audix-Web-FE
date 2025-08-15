import { AreaLayout } from "@/types/konva"

// 공정별 레이아웃 데이터
export const DEVICE_POSITIONS: AreaLayout[] = [
    {
        // 3공장 프레스 구역
        areaId: 1,
        devices: [
            { deviceId: 1, x: 400, y: 170 }, // 프레스 머신
            { deviceId: 2, x: 550, y: 310 }, // 코일 언코일러
            { deviceId: 3, x: 700, y: 170 }, // 레벨러 & 피더
            { deviceId: 4, x: 850, y: 310 }, // 블랭킹 프레스
        ],
        conveyors: [
            { points: [300, 250, 950, 250] },
        ],
        arrows: [
            // angle 0 : 오른쪽, 90 : 아래쪽, 180 : 왼쪽
            { x: 490, y: 250, angle: 0 },
            { x: 510, y: 250, angle: 0 },
            { x: 750, y: 250, angle: 0 },
            { x: 770, y: 250, angle: 0 },
        ]
    },
    {
        // 차체 31라인
        areaId: 3,
        devices: [
            { deviceId: 5, x: 400, y: 70 }, // 스폿 용접기
            { deviceId: 6, x: 700, y: 70 }, // 스폿 용접기
            { deviceId: 7, x: 860, y: 220 }, // 용접 로봇
            { deviceId: 8, x: 700, y: 360 }, // 용접 로봇
            { deviceId: 9, x: 400, y: 360 }, // 용접 로봇
            { deviceId: 10, x: 220, y: 300 }, // 리프터 & 컨베이어
        ],
        conveyors: [
            { points: [300, 150, 950, 150] },
            { points: [950, 150, 950, 300] },
            { points: [300, 300, 950, 300] },
        ],
        arrows: [
            // angle 0 : 오른쪽, 90 : 아래쪽, 180 : 왼쪽
            { x: 490, y: 150, angle: 0 },
            { x: 510, y: 150, angle: 0 },
            { x: 725, y: 150, angle: 0 },
            { x: 745, y: 150, angle: 0 },
            { x: 950, y: 220, angle: 90 },
            { x: 950, y: 240, angle: 90 },
            { x: 490, y: 300, angle: 180 },
            { x: 510, y: 300, angle: 180 },
            { x: 725, y: 300, angle: 180 },
            { x: 745, y: 300, angle: 180 },
        ]
    },
    {
        // 도장 31라인
        areaId: 4,
        devices: [
            { deviceId: 11, x: 400, y: 70 }, // 스프레이 로봇
            { deviceId: 12, x: 700, y: 70 }, // 스프레이 로봇
            { deviceId: 13, x: 850, y: 220 }, // 전착 탱크
            { deviceId: 14, x: 500, y: 360 }, // 건조로
            { deviceId: 15, x: 330, y: 220 }, // 리프트 / 셔틀
            { deviceId: 16, x: 330, y: 360 }, // 리프트 / 셔틀
        ],
        conveyors: [
            { points: [300, 150, 950, 150] },
            { points: [950, 150, 950, 300] },
            { points: [300, 300, 950, 300] },
        ],
        arrows: [
            // angle 0 : 오른쪽, 90 : 아래쪽, 180 : 왼쪽
            { x: 490, y: 150, angle: 0 },
            { x: 510, y: 150, angle: 0 },
            { x: 725, y: 150, angle: 0 },
            { x: 745, y: 150, angle: 0 },
            { x: 950, y: 220, angle: 90 },
            { x: 950, y: 240, angle: 90 },
            { x: 490, y: 300, angle: 180 },
            { x: 510, y: 300, angle: 180 },
            { x: 725, y: 300, angle: 180 },
            { x: 745, y: 300, angle: 180 },
        ]
    },
    {
        // 의장 31라인
        areaId: 5,
        devices: [
            { deviceId: 17, x: 400, y: 50 }, // 조립 로봇
            { deviceId: 18, x: 650, y: 50 }, // 체결 공구
            { deviceId: 19, x: 750, y: 180 }, // 체결 공구
            { deviceId: 20, x: 500, y: 180 }, // 체결 공구
            { deviceId: 21, x: 500, y: 410 }, // 체결 공구
            { deviceId: 22, x: 210, y: 300 }, // 컨베이어 시스템
            { deviceId: 23, x: 750, y: 410 }, // 냉각수 및 윤활 설비
        ],
        conveyors: [
            { points: [300, 130, 950, 130] },
            { points: [950, 130, 950, 250] },
            { points: [300, 250, 950, 250] },
            { points: [300, 250, 300, 350] },
            { points: [300, 350, 950, 350] },
        ],
        arrows: [
            // angle 0 : 오른쪽, 90 : 아래쪽, 180 : 왼쪽
            { x: 600, y: 130, angle: 0 },
            { x: 620, y: 130, angle: 0 },
            // { x: 725, y: 150, angle: 0 }, 
            // { x: 745, y: 150, angle: 0 }, 
            { x: 950, y: 200, angle: 90 },
            { x: 950, y: 220, angle: 90 },
            { x: 600, y: 250, angle: 180 },
            { x: 620, y: 250, angle: 180 },
            // { x: 725, y: 250, angle: 180 },   
            // { x: 745, y: 250, angle: 180 },
            { x: 300, y: 290, angle: 90 },
            { x: 300, y: 310, angle: 90 },
            { x: 600, y: 350, angle: 0 },
            { x: 620, y: 350, angle: 0 },
            // { x: 725, y: 350, angle: 0 },   
            // { x: 745, y: 350, angle: 0 }, 
        ]
    },
]
