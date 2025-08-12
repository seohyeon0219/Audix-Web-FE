import { DeviceData } from "@/types/models/device";

export const MockDeviceData: DeviceData[] = [
    // 3공장 프레스 구역
    {
        areaId: 1,
        deviceId: 1,
        name: '프레스 머신',
        model: 'AIDA-NC1-200T',
        address: '3공장 프레스 구역 -1',
        deviceManager: '이하은',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/robotArm2.png',
        status: 'normal',
        aiText: '정상 작동 중인 장비입니다.'
    },
    {
        areaId: 1,
        deviceId: 2,
        name: '코일 언코일러',
        model: 'FAGOR-UCR-2000',
        address: '3공장 프레스 구역 -2',
        deviceManager: '김현민',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.55,
        image: '/images/devices/robotArm2.png',
        status: 'warning',
        aiText: '점검 요망인 장비입니다.'
    },
    {
        areaId: 1,
        deviceId: 3,
        name: '레벨러 & 피더',
        model: 'ARKU-FlatMaster-45',
        address: '3공장 프레스 구역 -3',
        deviceManager: '김재걸',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/robotArm2.png',
        status: 'normal',
        aiText: '정상 작동 중인 장비입니다.'
    },
    {
        areaId: 1,
        deviceId: 4,
        name: '블랭킹 프레스',
        model: 'SCHULER-PBS-1000',
        address: '3공장 프레스 구역 -4',
        deviceManager: '김재걸',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/robotArm2.png',
        status: 'normal' ,
        aiText: '정상 작동 중인 장비입니다.'
    },
    // 차체 31라인
    {
        areaId: 2,
        deviceId: 5,
        name: '스폿 용접기',
        model: 'ARO-SW-7500',
        address: '차체 31라인 -1',
        deviceManager: '김현민',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.55,
        image: '/images/devices/robotArm2.png',
        status: 'warning',
        aiText: '점검 요망인 장비입니다.'
    },
    {
        areaId: 2,
        deviceId: 6,
        name: '스폿 용접기',
        model: 'ARO-SW-7500',
        address: '차체 31라인 -2',
        deviceManager: '이하은',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        image: '/images/devices/robotArm2.png',
        status: 'offline',
        aiText: '마이크 미연결 장비입니다.'
    },
    {
        areaId: 2,
        deviceId: 7,
        name: '용접 로봇',
        model: 'KUKA-KR-210-R3100',
        address: '차체 31라인 -3',
        deviceManager: '김서현',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/robotArm2.png',
        status: 'normal',
        aiText: '정상 작동 중인 장비입니다.'
    },
    {
        areaId: 2,
        deviceId: 8,
        name: '용접 로봇',
        model: 'KUKA-KR-210-R3100',
        address: '차체 31라인 -4',
        deviceManager: '김현민',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/robotArm2.png',
        status: 'normal',
        aiText: '정상 작동 중인 장비입니다.'
    },
    {
        areaId: 2,
        deviceId: 9,
        name: '용접 로봇',
        model: 'KUKA-KR-210-R3100',
        address: '차체 31라인 -5',
        deviceManager: '김서현',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/robotArm2.png',
        status: 'normal',
        aiText: '정상 작동 중인 장비입니다.'
    },
    {
        areaId: 2,
        deviceId: 10,
        name: '리프터 & 컨베이어',
        model: 'DAIFUKU-LC-3000',
        address: '차체 31라인 -6',
        deviceManager: '김서현',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/robotArm2.png',
        status: 'normal',
        aiText: '정상 작동 중인 장비입니다.'
    },
    // 도장 31라인
    {
        areaId: 3,
        deviceId: 11,
        name: '스프레이 로봇',
        model: 'ABB-IRB-5400',
        address: '도장 31라인 -1',
        deviceManager: '김현민',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        image: '/images/devices/robotArm2.png',
        status: 'repair',
        aiText: '수리 중인 장비입니다.'
    },
    {
        areaId: 3,
        deviceId: 12,
        name: '스프레이 로봇',
        model: 'ABB-IRB-5400',
        address: '도장 31라인 -2',
        deviceManager: '도종명',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/robotArm2.png',
        status: 'normal',
        aiText: '정상 작동 중인 장비입니다.'
    },
    {
        areaId: 3,
        deviceId: 13,
        name: '전착 탱크',
        model: 'EISENMANN-EDT-4000',
        address: '도장 31라인 -3',
        deviceManager: '도종명',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/robotArm3.png',
        status: 'normal',
        aiText: '정상 작동 중인 장비입니다.'
    },
    {
        areaId: 3,
        deviceId: 14,
        name: '건조로',
        model: 'DURR-EcoInCure-L',
        address: '도장 31라인 -4',
        deviceManager: '김현민',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/robotArm3.png',
        status: 'normal',
        aiText: '정상 작동 중인 장비입니다.'
    },
    {
        areaId: 3,
        deviceId: 15,
        name: '리프트 & 셔틀',
        model: 'DÜRR-EcoLift-V1',
        address: '도장 31라인 -5',
        deviceManager: '도종명',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.3,
        image: '/images/devices/robotArm3.png',
        status: 'danger',
        aiText: '위험 장비입니다.'
    },
    {
        areaId: 3,
        deviceId: 16,
        name: '리프트 & 셔틀',
        model: 'DÜRR-EcoLift-V1',
        address: '도장 31라인 -6',
        deviceManager: '김서현',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/robotArm3.png',
        status: 'normal',
        aiText: '정상 작동 중인 장비입니다.'
    },
    // 의장 31라인
    {
        areaId: 4,
        deviceId: 17,
        name: '조립 로봇',
        model: 'FANUC-R-2000iC',
        address: '의장 31라인 -1',
        deviceManager: '도종명',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/robotArm3.png',
        status: 'normal',
        aiText: '정상 작동 중인 장비입니다.'
    },
    {
        areaId: 4,
        deviceId: 18,
        name: '체결 공구',
        model: 'ATLAS-COPCO-4000',
        address: '의장 31라인 -2',
        deviceManager: '김서현',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/robotArm3.png',
        status: 'normal',
        aiText: '정상 작동 중인 장비입니다.'
    },
    {
        areaId: 4,
        deviceId: 19,
        name: '체결 공구',
        model: 'ATLAS-COPCO-4000',
        address: '의장 31라인 -3',
        deviceManager: '도종명',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/robotArm3.png',
        status: 'normal',
        aiText: '정상 작동 중인 장비입니다.'
    },
    {
        areaId: 4,
        deviceId: 20,
        name: '체결 공구',
        model: 'ATLAS-COPCO-4000',
        address: '의장 31라인 -4',
        deviceManager: '김현민',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/robotArm3.png',
        status: 'normal',
        aiText: '정상 작동 중인 장비입니다.'
    },
    {
        areaId: 4,
        deviceId: 21,
        name: '체결 공구',
        model: 'ATLAS-COPCO-4000',
        address: '의장 31라인 -5',
        deviceManager: '도종명',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/robotArm3.png',
        status: 'normal',
        aiText: '정상 작동 중인 장비입니다.'
    },
    {
        areaId: 4,
        deviceId: 22,
        name: '컨베이어 시스템',
        model: 'BOSCH-TS-2plus',
        address: '의장 31라인 -6',
        deviceManager: '김현민',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        image: '/images/devices/robotArm3.png',
        status: 'offline',
        aiText: '마이크 미연결 장비입니다.'
    },
    {
        areaId: 4,
        deviceId: 23,
        name: '냉각수 및 윤활 설비',
        model: 'BIRAL-CCS-300',
        address: '의장 31라인 -7',
        deviceManager: '이하은',
        parts: {
            "gear" : 0.7,
            "pan" : 0.3,
            "bearing" : 0.5
        },
        normalScore: 0.85,
        image: '/images/devices/robotArm3.png',
        status: 'normal',
        aiText: '정상 작동 중인 장비입니다.'
    },
]
