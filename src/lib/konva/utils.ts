import { DevicePosition, AreaLayout } from "@/lib/konva/config";
import { DEVICE_POSITIONS } from '@/lib/konva/mockData';
import { MockDeviceData } from "@/mocks";
import { DeviceWithPosition, ProcessNode } from "./types";

// areaCanvas
export const getAreaLayout = (areaId: number): AreaLayout | undefined => {
    return DEVICE_POSITIONS.find(layout => layout.areaId === areaId);
};

export const getDevicePosition = (deviceId: number, areaId: number): DevicePosition | undefined => {
    const areaLayout = getAreaLayout(areaId);
    return areaLayout?.devices.find(device => device.deviceId === deviceId);
}

export const combineDevicesWithPositions = (areaId: number): DeviceWithPosition[] => {
    const areaDevices = MockDeviceData.filter(device => device.areaId === areaId);
    const areaLayout = getAreaLayout(areaId);

    return areaDevices.map(device => {
        const position = areaLayout?.devices.find(d => d.deviceId === device.deviceId)
        return {
            ...device,
            x: position?.x || 0,
            y: position?.y || 0
        }
    })
}

// 장비 찾기
export const findDeviceById = (deviceId: string) => {
    return MockDeviceData.find(d => d.deviceId === parseInt(deviceId));
}

// 텍스트 오프셋 계산
export const calculateTextOffset = (text: string, multiplier: number): number => {
    return text.length * multiplier;
};

// 텍스트 y 위치 계산
export const calculateTextY = (baseY: number, fontSize: number): number => {
    return baseY = fontSize / 2;
}

// factoryCanvas
// 레벨별 스타일 정의 함수
export const getNodeStyle = (level: ProcessNode['level']) => {
    switch (level) {
        case 'factory':
            return {
                fill: '#303957',
                stroke: '#ffffff',
                strokeWidth: 2,
                textColor: '#ffffff'
            };
        case 'process':
            return {
                fill: '#ffffff',
                stroke: '#333333',
                strokeWidth: 1,
                textColor: '#333333'
            };
        default:
            return {
                fill: '#ffffff',
                stroke: '#333333',
                strokeWidth: 1,
                textColor: '#333333'
            };
    };
}

// 레벨 라벨
export const getLevelLabel = (level: ProcessNode['level']): string => {
    const levelLabels = {
        factory: '공장',
        line: '라인',
        process: '공정',
        material: '차체'
    };
    return levelLabels[level] || '알 수 없음';
}

// 노트 ID를 라우트로 변환
export const getRouteByNodeId = (nodeId: string): string | null => {
    const routeMap: Record<string, string> = {
        process: '/area/1',
        material: '/area/2',
        painting: '/area/3',
        assembly: '/area/4'
    };
    return routeMap[nodeId] || null;
}