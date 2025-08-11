import { MockDeviceData, AI_DATA, MockAreaData } from "@/mocks"
import { AiTextProps, AiTextResult } from "@/types/deviceMonitoring"
import { getStatusStyle, getStatusStyleFromString } from "@/utils/statusUtils";
import { useMemo } from "react"
import { DeviceInfoProps } from "@/types/deviceMonitoring";

// aiText
export const useAiText = ({ areaId, deviceId }: AiTextProps) => {
    // mock data에서 해당 장비 찾기
    const device = useMemo(() => {
        return MockDeviceData.find(d => 
            d.areaId === parseInt(areaId) &&
            d.deviceId === parseInt(deviceId)
        );
    }, [areaId, deviceId]);

    // ai 결과 데이터 생성
    const result: AiTextResult = useMemo(() => {
        if (!device) {
            return {
                status: 'offline',
                message: '해당 장비를 찾을 수 없습니다.'
            }
        };
        const status = device.status || 'normal';
        return {
            status: status as AiTextResult['status'],
            message: AI_DATA(status, device.name)
        }
    }, [device]);

    // 스타일 반환
    const statusStyle = useMemo(() => {
        return getStatusStyle(result.status);
    }, [result.status]);

    return { result, statusStyle };
}

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
