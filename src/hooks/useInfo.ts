import { useMemo } from "react"
import { MockDeviceData, MockAreaData } from "@/mocks"
import { getStatusStyle, getStatusStyleFromString } from "@/utils/statusUtils";
import { DeviceInfoProps } from "@/types/props/deviceInfo";

// info
export const useInfo = ({ areaId, deviceId }: DeviceInfoProps) => {
    // 구역 정보 찾기
    const area = useMemo(() => {
        return MockAreaData.find(area => area.id === parseInt(areaId));
    }, [areaId])

    // 장비 정보 찾기
    const device = useMemo(() => {
        return MockDeviceData.find(device => device.deviceId === parseInt(deviceId));
    }, [deviceId])

    // 장비 상태 스타일
    const deviceStatus = useMemo(() => {
        if (!device) return null;
        return getStatusStyleFromString(device.status);
    }, [device]);

    return {
        area,
        device,
        deviceStatus
    };
}