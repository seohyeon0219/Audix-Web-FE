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
            { deviceId: 1, x: 200, y: 150 }, // 프레스 머신
            { deviceId: 2, x: 300, y: 150 }, // 코일 언코일러
            { deviceId: 3, x: 400, y: 150 }, // 레벨러 & 피더
            { deviceId: 4, x: 500, y: 150 }, // 블랭킹 프레스
        ],
        conveyors: [
            { points: [150, 200, 650, 200 ] },
            { points: [150, 200, 650, 200 ] },
        ]
    },
    {
        // 차체 31라인
        areaId: 2,
        devices: [
            { deviceId: 5, x: 200, y: 150 }, // 스폿 용접기
            { deviceId: 6, x: 300, y: 150 }, // 스폿 용접기
            { deviceId: 7, x: 400, y: 150 }, // 용접 로봇
            { deviceId: 8, x: 500, y: 150 }, // 용접 로봇
            { deviceId: 8, x: 500, y: 150 }, // 용접 로봇
            { deviceId: 9, x: 500, y: 150 }, // 리프터 & 컨베이어
        ],
        conveyors: [
            { points: [150, 200, 650, 200 ] },
            { points: [150, 200, 650, 200 ] },
        ]
    },
    {
        // 도장 31라인
        areaId: 3,
        devices: [
            { deviceId: 10, x: 200, y: 150 }, // 스프레이 로봇
            { deviceId: 11, x: 300, y: 150 }, // 스프레이 로봇
            { deviceId: 12, x: 400, y: 150 }, // 전착 탱크
            { deviceId: 13, x: 500, y: 150 }, // 건조로
            { deviceId: 13, x: 500, y: 150 }, // 리프트 / 셔틀
            { deviceId: 13, x: 500, y: 150 }, // 리프트 / 셔틀
        ],
        conveyors: [
            { points: [150, 200, 650, 200 ] },
            { points: [150, 200, 650, 200 ] },
        ]
    },
    {
        // 의장 31라인
        areaId: 4,
        devices: [
            { deviceId: 14, x: 200, y: 150 }, // 조립 로봇
            { deviceId: 15, x: 300, y: 150 }, // 체결 공구
            { deviceId: 16, x: 400, y: 150 }, // 체결 공구
            { deviceId: 17, x: 500, y: 150 }, // 체결 공구
            { deviceId: 18, x: 500, y: 150 }, // 체결 공구
            { deviceId: 18, x: 500, y: 150 }, // 컨베이어 시스템
            { deviceId: 18, x: 500, y: 150 }, // 냉각수 및 윤활 설비
        ],
        conveyors: [
            { points: [150, 200, 650, 200 ] },
            { points: [150, 200, 650, 200 ] },
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