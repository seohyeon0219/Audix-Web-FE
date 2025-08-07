// 장비 위치 정보
interface DevicePosition {
    deviceId: number;
    x: number;
    y: number;
}

// 컨베이어 벨트 정보
interface AreaLayout {
    areaId: number;
    devices: DevicePosition[];
    conveyors?: Array<{ points: number[] }>;
}

// 공정별 레이아웃 데이터
export const DEVICE_POSITIONS: AreaLayout[] = [
    {
        // 3공장 프레스 구역
        areaId: 1,
        devices: [
            { deviceId: 1, x: 400, y: 200 }, // 프레스 머신
            { deviceId: 2, x: 550, y: 300 }, // 코일 언코일러
            { deviceId: 3, x: 700, y: 200 }, // 레벨러 & 피더
            { deviceId: 4, x: 850, y: 300 }, // 블랭킹 프레스
        ],
        conveyors: [
            { points: [300, 250, 950, 250 ] },
        ]
    },
    {
        // 차체 31라인
        areaId: 2,
        devices: [
            { deviceId: 5, x: 400, y: 100 }, // 스폿 용접기
            { deviceId: 6, x: 700, y: 100 }, // 스폿 용접기
            { deviceId: 7, x: 880, y: 220 }, // 용접 로봇
            { deviceId: 8, x: 700, y: 350 }, // 용접 로봇
            { deviceId: 9, x: 400, y: 350 }, // 용접 로봇
            { deviceId: 10, x: 230, y: 300 }, // 리프터 & 컨베이어
        ],
        conveyors: [
            { points: [300, 150, 950, 150 ] },
            { points: [950, 150, 950, 300 ] },
            { points: [300, 300, 950, 300 ] },
        ]
    },
    {
        // 도장 31라인
        areaId: 3,
        devices: [
            { deviceId: 11, x: 400, y: 100 }, // 스프레이 로봇
            { deviceId: 12, x: 700, y: 100 }, // 스프레이 로봇
            { deviceId: 13, x: 880, y: 220 }, // 전착 탱크
            { deviceId: 14, x: 500, y: 350 }, // 건조로
            { deviceId: 15, x: 330, y: 250 }, // 리프트 / 셔틀
            { deviceId: 16, x: 330, y: 350 }, // 리프트 / 셔틀
        ],
        conveyors: [
            { points: [300, 150, 950, 150 ] },
            { points: [950, 150, 950, 300 ] },
            { points: [300, 300, 950, 300 ] },
        ]
    },
    {
        // 의장 31라인
        areaId: 4,
        devices: [
            { deviceId: 17, x: 400, y: 100 }, // 조립 로봇
            { deviceId: 18, x: 600, y: 100 }, // 체결 공구
            { deviceId: 19, x: 750, y: 200 }, // 체결 공구
            { deviceId: 20, x: 500, y: 200 }, // 체결 공구
            { deviceId: 21, x: 500, y: 400 }, // 체결 공구
            { deviceId: 22, x: 230, y: 150 }, // 컨베이어 시스템
            { deviceId: 23, x: 750, y: 400 }, // 냉각수 및 윤활 설비
        ],
        conveyors: [
            { points: [300, 150, 950, 150 ] },
            { points: [950, 150, 950, 250 ] },
            { points: [300, 250, 950, 250 ] },
            { points: [300, 250, 300, 350 ] },
            { points: [300, 350, 950, 350 ] },
        ]
    },
]

export const getAreaLayout = (areaId: number): AreaLayout | undefined => {
    return DEVICE_POSITIONS.find(layout => layout.areaId === areaId);
};

export const getDevicePosition = (deviceId: number, areaId: number): DevicePosition | undefined => {
    const areaLayout = getAreaLayout(areaId);
    return areaLayout?.devices.find(device => device.deviceId === deviceId);
}