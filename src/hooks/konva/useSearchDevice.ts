import { useMemo } from "react";
import { MockDeviceData } from "@/mocks";

// 장비 정보 하나 찾기
export const useSearchDevice = (areaId: string, deviceId: string) => {
    const device = useMemo(() => {
        return MockDeviceData.find(
            device =>
                device.areaId === parseInt(areaId) &&
                device.deviceId === parseInt(deviceId)
        )
    }, [areaId, deviceId]);

    return { device };
}

// 장비 정보 여러 개 찾기
export const useSearchDevices = (areaId: string) => {
    const devices = useMemo(() => {
        return MockDeviceData.filter(device => device.areaId === parseInt(areaId));
    }, [areaId]);

    return { devices };
}