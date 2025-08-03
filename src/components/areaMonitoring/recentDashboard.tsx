import { getStatusFromValue, getStatusColor } from "@/constants/status";

import { mockRecentDashboardData } from '@/mocks/index';

export default function RecentDashboard() {
    return (
        <div className="bg-main-100 min-w-96 w-fit rounded-lg px-14 py-4 border border-t-white">
            <h3 className="text-white pb-2 mb-4 border-b border-white">최근 10일 대시보드</h3>
            <div className="flex gap-3">
                {mockRecentDashboardData.map((data, index) => {
                    const status = getStatusFromValue(data.value);
                    const colorClass = getStatusColor(status);

                    return (
                        <div 
                            key={index}
                            className={`w-6 h-6 rounded cursor-pointer ${colorClass}`}
                            title={`${data.date}: ${data.value} (${status})`}
                        />
                    )
                })}

            </div>
        </div>
    )
}