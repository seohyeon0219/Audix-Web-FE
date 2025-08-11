import { AreaLayout, DevicePosition } from '@/types/konva/index';
import { DEVICE_POSITIONS } from '@/mocks/konva/index';
import { MockDeviceData } from "@/mocks";
import { DeviceWithPosition, ProcessNode } from "@/types/konva/index";

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