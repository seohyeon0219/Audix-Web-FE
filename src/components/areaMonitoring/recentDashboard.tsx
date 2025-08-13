import { getStatusStyleFromString } from "@/utils/statusUtils";
import { mockRecentDashboardData } from '@/mocks';
import { useCustomTooltip } from "@/hooks/useCustomTooltip";
import CustomTooltip from "../common/customTooltip";

export default function RecentDashboard() {

    const { tooltip, showTooltip, hideTooltip } = useCustomTooltip();

    return (
        <div className="bg-main-100 rounded-lg px-6 py-3 h-full">
            <h3 className="text-white pb-2 mb-2 border-b border-white">최근 7일 대시보드</h3>
            <div className="flex gap-3">
                {mockRecentDashboardData.map((data, index) => {
                    const statusStyle = getStatusStyleFromString(data.status);

                    // 날짜를 월 / 일 형태로 분리
                    const [year, month, day] = data.date.split('-');

                    return (
                        <div 
                            key={index}
                            className="flex flex-col items-center"
                            onMouseEnter={(e) => showTooltip(`${data.date}: ${statusStyle.label}`, e)}
                            onMouseLeave={hideTooltip}
                        >
                            <p className="text-xs text-gray-400 mb-1">{month}/{day}</p>
                            <div className={`w-6 h-6 rounded cursor-pointer ${statusStyle.bgColor}`}></div>
                        </div>
                    )
                })}

            </div>
            <CustomTooltip {...tooltip} />
        </div>
    )
}