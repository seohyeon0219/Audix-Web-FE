import { DeviceData, AreaData } from '@/types/areaMachineType';

// 구역별 장비 mock data
export const MockAreaData: AreaData[] = [
    {
        id: 1,
        name: '3공장 프레스 구역',
        address: '울산 현대자동차 31라인',
        status: 'normal'
    },
    {
        id: 2,
        name: '차체 31라인',
        address: '울산 현대자동차 31라인',
        status: 'normal'
    },
    {
        id: 3,
        name: '도장 31라인',
        address: '울산 현대자동차 31라인',
        status: 'warning'
    },
    {
        id: 4,
        name: '의장 31라인',
        address: '울산 현대자동차 31라인',
        status: 'danger'
    },
]

export const MockDeviceData: DeviceData[] = [
    // 3공장 프레스 구역
    {
        areaId: 1,
        deviceId: 1,
        name: '프레스 머신',
        deviceManager: '이하은',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/machines/roborArm1.png' 
    },
    {
        areaId: 1,
        deviceId: 2,
        name: '코일 언코일러',
        deviceManager: '김현민',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/machines/roborArm1.png' 
    },
    {
        areaId: 1,
        deviceId: 3,
        name: '레벨러 & 피더',
        deviceManager: '김재걸',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/machines/roborArm1.png' 
    },
    {
        areaId: 1,
        deviceId: 4,
        name: '블랭킹 프레스',
        deviceManager: '김재걸',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/machines/roborArm1.png' 
    },
    // 차체 31라인
    {
        areaId: 2,
        deviceId: 5,
        name: '스폿 용접기',
        deviceManager: '김현민',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/machines/roborArm1.png' 
    },
    {
        areaId: 2,
        deviceId: 6,
        name: '스폿 용접기',
        deviceManager: '이하은',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/machines/roborArm1.png' 
    },
    {
        areaId: 2,
        deviceId: 7,
        name: '용접 로봇',
        deviceManager: '김서현',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/machines/roborArm1.png' 
    },
    {
        areaId: 2,
        deviceId: 8,
        name: '용접 로봇',
        deviceManager: '김현민',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/machines/roborArm1.png' 
    },
    {
        areaId: 2,
        deviceId: 9,
        name: '용접 로봇',
        deviceManager: '김서현',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/machines/roborArm1.png' 
    },
    {
        areaId: 2,
        deviceId: 9,
        name: '리프터 & 컨베이어',
        deviceManager: '김서현',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/machines/roborArm1.png' 
    },
    // 도장 31라인
    {
        areaId: 3,
        deviceId: 10,
        name: '스프레이 로봇',
        deviceManager: '김현민',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/machines/roborArm1.png' 
    },
    {
        areaId: 3,
        deviceId: 11,
        name: '스프레이 로봇',
        deviceManager: '도종명',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/machines/roborArm1.png' 
    },
    {
        areaId: 3,
        deviceId: 12,
        name: '전착 탱크',
        deviceManager: '도종명',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/machines/roborArm1.png' 
    },
    {
        areaId: 3,
        deviceId: 13,
        name: '건조로',
        deviceManager: '김현민',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/machines/roborArm1.png' 
    },
    {
        areaId: 3,
        deviceId: 14,
        name: '리프터 & 셔틀',
        deviceManager: '도종명',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/machines/roborArm1.png' 
    },
    {
        areaId: 3,
        deviceId: 15,
        name: '리프터 & 셔틀',
        deviceManager: '김서현',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/machines/roborArm1.png' 
    },
    // 의장 31라인
    {
        areaId: 4,
        deviceId: 16,
        name: '조립 로봇',
        deviceManager: '도종명',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/machines/roborArm1.png' 
    },
    {
        areaId: 4,
        deviceId: 17,
        name: '체결 공구',
        deviceManager: '김서현',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/machines/roborArm1.png' 
    },
    {
        areaId: 4,
        deviceId: 18,
        name: '체결 공구',
        deviceManager: '도종명',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/machines/roborArm1.png' 
    },
    {
        areaId: 4,
        deviceId: 19,
        name: '체결 공구',
        deviceManager: '김현민',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/machines/roborArm1.png' 
    },
    {
        areaId: 4,
        deviceId: 20,
        name: '체결 공구',
        deviceManager: '도종명',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/machines/roborArm1.png' 
    },
    {
        areaId: 4,
        deviceId: 21,
        name: '컨베이어 시스템',
        deviceManager: '김현민',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/machines/roborArm1.png' 
    },
    {
        areaId: 4,
        deviceId: 22,
        name: '냉각수 및 윤활 설비',
        deviceManager: '이하은',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/machines/roborArm1.png' 
    },
]
