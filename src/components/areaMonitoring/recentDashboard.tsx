import { getStatusStyleFromString } from "@/utils/statusUtils";
import { mockRecentDashboardData } from '@/mocks';
import { useCustomTooltip } from "@/hooks/useCustomTooltip";
import CustomTooltip from "../common/customTooltip";

export default function RecentDashboard() {

    const { tooltip, showTooltip, hideTooltip } = useCustomTooltip();

    return (
        <div className="bg-main-100 min-w-60 w-fit rounded-lg px-6 py-3 h-full">
            <h3 className="text-white pb-1 mb-4 border-b border-white">최근 7일 대시보드</h3>
            <div className="flex gap-3">
                {mockRecentDashboardData.map((data, index) => {
                    const statusStyle = getStatusStyleFromString(data.status);

                    return (
                        <div 
                            key={index}
                            className={`w-6 h-6 rounded cursor-pointer ${statusStyle.bgColor}`}
                            onMouseEnter={(e) => showTooltip(`${data.date}: ${statusStyle.label}`, e)}
                            onMouseLeave={hideTooltip}
                        />
                    )
                })}

            </div>
            <CustomTooltip {...tooltip} />
        </div>
    )
}