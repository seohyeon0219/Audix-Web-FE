import { alarms } from "@/mocks/data/alarmData";

export default function AlarmDashboard() {
    return (
        <div className="flex items-center gap-8 bg-main-100 min-w-96 w-fit rounded-lg px-6 py-4 h-full">
            <h3 className="text-white border-white">이번 달<br/> 알림 건수</h3>
            {alarms.map((data, index) => {
                const borderColor = data.borderColor;
                const textColor = data.textColor;

                return (
                    <div key={index} className="flex items-center gap-3">
                        <div 
                            className={`w-14 h-14 text-xs font-black rounded-lg cursor-pointer border flex justify-center items-center whitespace-pre-line ${textColor} ${borderColor}`}
                            title={`${data.label}: ${data.count}`}
                        >
                            {data.label}
                        </div>
                        <div
                            className={`text-white`}>
                            {data.count}건
                        </div>
                    </div>
                )
            })}
        </div>
    )
}