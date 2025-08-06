import { DeviceData } from "@/types/deviceType";

export const MockDeviceData: DeviceData[] = [
    // 3공장 프레스 구역
    {
        areaId: 1,
        deviceId: 1,
        name: '프레스 머신',
        model: 'model',
        deviceManager: '이하은',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/roborArm1.png',
        status: 'normal'
    },
    {
        areaId: 1,
        deviceId: 2,
        name: '코일 언코일러',
        model: 'model',
        deviceManager: '김현민',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/roborArm1.png',
        status: 'normal'
    },
    {
        areaId: 1,
        deviceId: 3,
        name: '레벨러 & 피더',
        model: 'model',
        deviceManager: '김재걸',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/roborArm1.png',
        status: 'normal'
    },
    {
        areaId: 1,
        deviceId: 4,
        name: '블랭킹 프레스',
        model: 'model',
        deviceManager: '김재걸',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/roborArm1.png',
        status: 'normal' 
    },
    // 차체 31라인
    {
        areaId: 2,
        deviceId: 5,
        name: '스폿 용접기',
        model: 'model',
        deviceManager: '김현민',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/roborArm1.png',
        status: 'normal'
    },
    {
        areaId: 2,
        deviceId: 6,
        name: '스폿 용접기',
        model: 'model',
        deviceManager: '이하은',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/roborArm1.png',
        status: 'normal' 
    },
    {
        areaId: 2,
        deviceId: 7,
        name: '용접 로봇',
        model: 'model',
        deviceManager: '김서현',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/roborArm1.png',
        status: 'normal'
    },
    {
        areaId: 2,
        deviceId: 8,
        name: '용접 로봇',
        model: 'model',
        deviceManager: '김현민',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/roborArm1.png',
        status: 'normal'
    },
    {
        areaId: 2,
        deviceId: 9,
        name: '용접 로봇',
        model: 'model',
        deviceManager: '김서현',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/roborArm1.png',
        status: 'normal'
    },
    {
        areaId: 2,
        deviceId: 10,
        name: '리프터 & 컨베이어',
        model: 'model',
        deviceManager: '김서현',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/roborArm1.png',
        status: 'normal'
    },
    // 도장 31라인
    {
        areaId: 3,
        deviceId: 11,
        name: '스프레이 로봇',
        model: 'model',
        deviceManager: '김현민',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/roborArm1.png',
        status: 'normal'
    },
    {
        areaId: 3,
        deviceId: 12,
        name: '스프레이 로봇',
        model: 'model',
        deviceManager: '도종명',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/roborArm1.png',
        status: 'normal'
    },
    {
        areaId: 3,
        deviceId: 13,
        name: '전착 탱크',
        model: 'model',
        deviceManager: '도종명',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/roborArm1.png',
        status: 'normal'
    },
    {
        areaId: 3,
        deviceId: 14,
        name: '건조로',
        model: 'model',
        deviceManager: '김현민',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/roborArm1.png',
        status: 'normal'
    },
    {
        areaId: 3,
        deviceId: 15,
        name: '리프터 & 셔틀',
        model: 'model',
        deviceManager: '도종명',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/roborArm1.png',
        status: 'normal'
    },
    {
        areaId: 3,
        deviceId: 16,
        name: '리프터 & 셔틀',
        model: 'model',
        deviceManager: '김서현',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/roborArm1.png',
        status: 'normal'
    },
    // 의장 31라인
    {
        areaId: 4,
        deviceId: 17,
        name: '조립 로봇',
        model: 'model',
        deviceManager: '도종명',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/roborArm1.png',
        status: 'normal'
    },
    {
        areaId: 4,
        deviceId: 18,
        name: '체결 공구',
        model: 'model',
        deviceManager: '김서현',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/roborArm1.png',
        status: 'normal'
    },
    {
        areaId: 4,
        deviceId: 19,
        name: '체결 공구',
        model: 'model',
        deviceManager: '도종명',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/roborArm1.png',
        status: 'normal'
    },
    {
        areaId: 4,
        deviceId: 20,
        name: '체결 공구',
        model: 'model',
        deviceManager: '김현민',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/roborArm1.png',
        status: 'normal'
    },
    {
        areaId: 4,
        deviceId: 21,
        name: '체결 공구',
        model: 'model',
        deviceManager: '도종명',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/roborArm1.png',
        status: 'normal'
    },
    {
        areaId: 4,
        deviceId: 22,
        name: '컨베이어 시스템',
        model: 'model',
        deviceManager: '김현민',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/roborArm1.png',
        status: 'normal'
    },
    {
        areaId: 4,
        deviceId: 23,
        name: '냉각수 및 윤활 설비',
        model: 'model',
        deviceManager: '이하은',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/roborArm1.png',
        status: 'normal'
    },
]
