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

