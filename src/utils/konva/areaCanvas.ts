import { AreaLayout, DevicePosition } from '@/types/konva/index';
import { DEVICE_POSITIONS } from '@/mocks/konva/index';
import { MockDeviceData } from "@/mocks";
import { DeviceWithPosition } from "@/types/konva/index";

// areaId로 해당 Area의 전체 레이아웃 (구역 맵) 찾기
export const getAreaLayout = (areaId: number): AreaLayout | undefined => {
    return DEVICE_POSITIONS.find(layout => layout.areaId === areaId);
};

// areaId, deviceId로 장비마다 위치 찾기
export const getDevicePosition = (deviceId: number, areaId: number): DevicePosition | undefined => {
    const areaLayout = getAreaLayout(areaId);
    return areaLayout?.devices.find(device => device.deviceId === deviceId);
}

// 장비 데이터, 장비 위치 결합해서 반환
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

// deviceId로 mock data에서 해당 장비 찾기
export const findDeviceById = (deviceId: string) => {
    return MockDeviceData.find(d => d.deviceId === parseInt(deviceId));
}