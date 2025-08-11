import { useMemo } from "react"
import { MockDeviceData, MockAreaData } from "@/mocks"
import { getAiTextByStatus } from "@/utils/konva/getAiTextByStatus";
import { AiTextProps } from "@/types/props/aiText";
import { AiTextResult } from "@/types/models/aiText";
import { getStatusStyle, getStatusStyleFromString } from "@/utils/statusUtils";

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
            message: getAiTextByStatus(status)
        }
    }, [device]);

    // 스타일 반환
    const statusStyle = useMemo(() => {
        return getStatusStyle(result.status);
    }, [result.status]);

    return { result, statusStyle };
}