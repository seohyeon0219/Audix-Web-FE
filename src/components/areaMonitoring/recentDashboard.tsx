import { getStatusStyleFromString, STATUS_STYLES } from "@/utils/statusUtils";
import { mockRecentDashboardData } from '@/mocks';

export default function RecentDashboard() {
    return (
        <div className="bg-main-100 min-w-96 w-fit rounded-lg px-6 py-3 h-full">
            <h3 className="text-white pb-1 mb-4 border-b border-white">최근 10일 대시보드</h3>
            <div className="flex gap-3">
                {mockRecentDashboardData.map((data, index) => {
                    const statusStyle = getStatusStyleFromString(data.status);

                    return (
                        <div 
                            key={index}
                            className={`w-6 h-6 rounded cursor-pointer ${statusStyle.bgColor}`}
                            title={`${data.date}: ${data.status} (${statusStyle.label})`}
                        />
                    )
                })}

            </div>
        </div>
    )
}