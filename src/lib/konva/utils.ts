import { DevicePosition, AreaLayout } from "@/lib/konva/config";
import { DEVICE_POSITIONS } from '@/lib/konva/mockData';

export const getAreaLayout = (areaId: number): AreaLayout | undefined => {
    return DEVICE_POSITIONS.find(layout => layout.areaId === areaId);
};

export const getDevicePosition = (deviceId: number, areaId: number): DevicePosition | undefined => {
    const areaLayout = getAreaLayout(areaId);
    return areaLayout?.devices.find(device => device.deviceId === deviceId);
}