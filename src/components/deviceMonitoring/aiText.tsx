import { AiTextProps } from "@/types/props/aiText";
import { useAiText } from "@/hooks";

export default function AiText({ areaId, deviceId }: AiTextProps) {
    
    const { result, statusStyle } = useAiText({ areaId, deviceId });

    return (
        <div className="bg-main-100 p-6 rounded-lg h-full flex flex-col">
            <div className="mb-4 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <span className="text-lg">{statusStyle.icon}</span>
                    <h3 className="text-white text-lg font-medium">AI 상태진단</h3>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                <p className="text-white">{result.message}</p>
            </div>
        </div>
    )
}