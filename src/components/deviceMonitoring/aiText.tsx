import { AiTextProps } from "@/types/props/aiText";
import { useAiText } from "@/hooks";
import { STATUS_STYLES } from "@/constants/status";

export default function AiText({ aiText }: AiTextProps) {

    // const statusKey = status.toUpperCase() as keyof typeof STATUS_STYLES;
    
    return (
        <div className="flex flex-col bg-main-100 p-6 rounded-lg h-full">
            <div className="mb-4 flex-shrink-0">
                <div className="flex items-center gap-2">
                    {/* <span className="text-lg">{STATUS_STYLES[statusKey].icon}</span> */}
                    <h3 className="text-white text-lg font-medium">AI 상태진단</h3>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                <p className="text-white">{aiText}</p>
            </div>
        </div>
    )
}