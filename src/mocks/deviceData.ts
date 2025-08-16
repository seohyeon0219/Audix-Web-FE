// src/mocks/deviceData.ts 업데이트

import { DeviceData } from "@/types/models/device";
import { deviceLogic } from "@/constants/api/logic";
import { API_BASE_URL } from "@/constants/api/config";

// 기존 정적 mock data (1,3,4,5 구역의 기본 데이터)
const staticMockDeviceData: DeviceData[] = [
    // Area 1 - 3공장 프레스 구역
    {
        deviceId: 101,
        areaId: 1,
        name: '프레스 1호기',
        model: 'PRESS-X1000',
        status: 'normal',
        address: '3공장 프레스 구역 A라인',
        deviceManager: '김철수',
        normalScore: 0.92,
        aiText: '현재 모든 시스템이 정상적으로 작동하고 있습니다.',
        image: '/images/devices/press1.jpg',
        parts: {
            'hydraulic_pump': 0.95,
            'motor': 0.88,
            'sensor': 0.91
        }
    },
    {
        deviceId: 102,
        areaId: 1,
        name: '프레스 2호기',
        model: 'PRESS-X2000',
        status: 'warning',
        address: '3공장 프레스 구역 B라인',
        deviceManager: '김철수',
        normalScore: 0.75,
        aiText: '유압 시스템에서 약간의 이상 신호가 감지되었습니다.',
        image: '/images/devices/press2.jpg',
        parts: {
            'hydraulic_pump': 0.72,
            'motor': 0.85,
            'sensor': 0.88
        }
    },
    // Area 3 - 차체 31라인
    {
        deviceId: 301,
        areaId: 3,
        name: '용접 로봇 1호',
        model: 'WELD-R100',
        status: 'normal',
        address: '차체 31라인 용접구역',
        deviceManager: '박영희',
        normalScore: 0.89,
        aiText: '용접 품질이 우수하며 정상 작동 중입니다.',
        image: '/images/devices/weld1.jpg',
        parts: {
            'welding_torch': 0.91,
            'servo_motor': 0.88,
            'controller': 0.87
        }
    },
    // Area 4 - 도장 31라인
    {
        deviceId: 401,
        areaId: 4,
        name: '스프레이 건 1호',
        model: 'PAINT-S500',
        status: 'danger',
        address: '도장 31라인 도장부스',
        deviceManager: '최민수',
        normalScore: 0.45,
        aiText: '스프레이 노즐에서 심각한 막힘 현상이 발견되었습니다.',
        image: '/images/devices/spray1.jpg',
        parts: {
            'spray_nozzle': 0.30,
            'pump': 0.55,
            'filter': 0.50
        }
    },
    // Area 5 - 의장 31라인
    {
        deviceId: 501,
        areaId: 5,
        name: '조립 로봇 1호',
        model: 'ASSEM-R200',
        status: 'normal',
        address: '의장 31라인 조립구역',
        deviceManager: '정수연',
        normalScore: 0.94,
        aiText: '모든 조립 공정이 원활하게 진행되고 있습니다.',
        image: '/images/devices/assembly1.jpg',
        parts: {
            'gripper': 0.96,
            'actuator': 0.92,
            'sensor': 0.94
        }
    }
];

// API 응답을 DeviceData 형식으로 변환하는 함수
const transformApiToDeviceData = (apiData: any[]): DeviceData[] => {
    return apiData.map((item) => ({
        deviceId: item.deviceId,
        areaId: item.areaId,
        name: item.name,
        model: item.model,
        status: item.status || 'normal',
        address: item.address,
        deviceManager: item.deviceManager,
        normalScore: item.normalScore || 0.8,
        aiText: item.aiText || 'AI 분석 결과가 없습니다.',
        image: item.image,
        parts: item.parts || {}
    }));
};

// 동기적으로 사용할 수 있는 MockDeviceData (초기값은 정적 데이터)
export let MockDeviceData: DeviceData[] = [];
// export let MockDeviceData: DeviceData[] = [...staticMockDeviceData];

// 특정 구역의 장비 데이터를 API로 가져와서 기존 데이터에 병합
export const updateMockDeviceDataByArea = async (areaId: number): Promise<boolean> => {
    try {
        console.log(`🔄 Area ${areaId}의 Device 데이터 추가 로딩 시작...`);

        const result = await deviceLogic.getDevicesByArea(areaId);

        if (result.success && result.data && result.data.length > 0) {
            const transformedData = transformApiToDeviceData(result.data);

            console.log(`📥 API에서 가져온 Area ${areaId} Device 데이터:`, transformedData);

            // 기존 MockDeviceData에서 해당 구역의 API로 가져온 deviceId와 겹치는 것들 제거
            const apiDeviceIds = transformedData.map(d => d.deviceId);
            MockDeviceData = MockDeviceData.filter(device =>
                device.areaId !== areaId || !apiDeviceIds.includes(device.deviceId)
            );

            // 새로운 API 데이터 추가
            MockDeviceData = [...MockDeviceData, ...transformedData];

            console.log(`✅ Area ${areaId} Device 데이터 병합 완료. 총 ${MockDeviceData.length}개 장비`);
            console.log(`📋 현재 MockDeviceData:`, MockDeviceData);

            return true;
        } else {
            console.log(`⚠️ Area ${areaId} API 데이터 없음, 기존 MockDeviceData 유지`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Area ${areaId} Device 데이터 업데이트 실패:`, error);
        return false;
    }
};

// 모든 구역의 장비 데이터를 한번에 업데이트 (필요한 구역만)
export const updateAllMockDeviceData = async (areaIds: number[] = [1, 3, 4, 5]): Promise<boolean> => {
    try {
        console.log('🔄 모든 Device 데이터 업데이트 시작...');

        const updatePromises = areaIds.map(areaId => updateMockDeviceDataByArea(areaId));
        const results = await Promise.all(updatePromises);

        const successCount = results.filter(result => result).length;
        console.log(`✅ ${successCount}/${areaIds.length}개 구역 Device 데이터 업데이트 완료`);

        return successCount > 0;
    } catch (error) {
        console.error('❌ 전체 Device 데이터 업데이트 실패:', error);
        return false;
    }
};

// MockDeviceData를 정적 데이터로 리셋
export const resetMockDeviceData = (): void => {
    MockDeviceData = [...staticMockDeviceData];
    console.log('🔄 MockDeviceData를 정적 데이터로 리셋');
};

// 특정 구역의 장비 개수 조회
export const getDeviceCountByArea = (areaId: number): number => {
    return MockDeviceData.filter(device => device.areaId === areaId).length;
};

// 현재 MockDeviceData 상태 조회 (디버깅용)
export const getCurrentMockDeviceData = (): DeviceData[] => {
    return MockDeviceData;
};