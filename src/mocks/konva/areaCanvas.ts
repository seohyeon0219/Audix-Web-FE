import { AreaLayout } from "@/types/konva"

// 공정별 레이아웃 데이터
export const DEVICE_POSITIONS: AreaLayout[] = [
    {
        // 3공장 프레스 구역
        areaId: 6,
        devices: [
            { deviceId: 46, x: 400, y: 170 }, // 프레스 머신
            { deviceId: 47, x: 550, y: 310 }, // 코일 언코일러
            { deviceId: 48, x: 700, y: 170 }, // 레벨러 & 피더
            { deviceId: 49, x: 850, y: 310 }, // 블랭킹 프레스
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
        areaId: 7,
        devices: [
            { deviceId: 50, x: 400, y: 70 }, // 스폿 용접기
            { deviceId: 51, x: 700, y: 70 }, // 스폿 용접기
            { deviceId: 52, x: 860, y: 220 }, // 용접 로봇
            { deviceId: 53, x: 700, y: 360 }, // 용접 로봇
            { deviceId: 54, x: 400, y: 360 }, // 용접 로봇
            { deviceId: 55, x: 220, y: 300 }, // 리프터 & 컨베이어
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
        areaId: 8,
        devices: [
            { deviceId: 56, x: 400, y: 70 }, // 스프레이 로봇
            { deviceId: 57, x: 700, y: 70 }, // 스프레이 로봇
            { deviceId: 58, x: 850, y: 220 }, // 전착 탱크
            { deviceId: 59, x: 500, y: 360 }, // 건조로
            { deviceId: 60, x: 330, y: 220 }, // 리프트 / 셔틀
            { deviceId: 61, x: 330, y: 360 }, // 리프트 / 셔틀
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
        areaId: 9,
        devices: [
            { deviceId: 62, x: 400, y: 50 }, // 조립 로봇
            { deviceId: 63, x: 650, y: 50 }, // 체결 공구
            { deviceId: 64, x: 750, y: 180 }, // 체결 공구
            { deviceId: 65, x: 500, y: 180 }, // 체결 공구
            { deviceId: 66, x: 500, y: 410 }, // 체결 공구
            { deviceId: 67, x: 210, y: 300 }, // 컨베이어 시스템
            { deviceId: 68, x: 750, y: 410 }, // 냉각수 및 윤활 설비
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
