import { useMemo } from "react"
import { MockDeviceData, MockAreaData } from "@/mocks"
import { getAiTextByStatus } from "@/utils/konva/getAiTextByStatus";
import { AiTextProps, UseAiTextProps } from "@/types/props/aiText";
import { AiTextResult } from "@/types/models/aiText";
import { getStatusStyle, getStatusStyleFromString } from "@/utils/statusUtils";

// aiText
export const useAiText = ({ areaId, deviceId }: UseAiTextProps) => {
    
    const { result, statusStyle } = useMemo(() => {
        // mock data에서 해당 장비 찾기
        const device = MockDeviceData.find(d => 
            d.areaId === parseInt(areaId) &&
            d.deviceId === parseInt(deviceId)
        );

        // 장비가 없을 때
        if (!device) {
            const notFoundResult: AiTextResult = {
                status: 'offline',
                message: '해당 장비를 찾을 수 없습니다.'
            };
            return {
                result: notFoundResult,
                statusStyle: getStatusStyle(notFoundResult.status)
            };
        }

        // 장비가 있을 때
        const status = device.status || 'normal';
        const finalResult: AiTextResult = {
            status: status as AiTextResult['status'],
            message: device.aiText || '등록된 진단 메시지가 없습니다.'
        };
        const finalStatusStyle = getStatusStyle(finalResult.status);

        // 최종 결과
        return {
            result: finalResult,
            statusStyle: finalStatusStyle
        }
    }, [areaId, deviceId]);
    
    return { result, statusStyle };
}