type DateAlarmType = 'danger' | 'warning';

interface DateAlarmCount {
    danger: number;
    warning: number;
}

// mock data
const mockDateAlarmCounts: DateAlarmCount = {
    danger: 1,
    warning: 5
}

const alarms = [
    {
        key: "danger" as DateAlarmType,
        label: "위험",
        count: mockDateAlarmCounts.danger,
        textColor: "text-danger",
        borderColor: "border-danger"
    },
    {
        key: "warning" as DateAlarmType,
        label: "점검\n요망",
        count: mockDateAlarmCounts.warning,
        textColor: "text-warning",
        borderColor: "border-warning"
    }
]

export default function AlarmDashboard() {
    return (
        <div className="flex items-center gap-8 bg-main-100 min-w-96 w-fit rounded-lg px-14 py-4 border border-t-white">
            <h3 className="text-white border-white">이번 달<br/> 알림 건수</h3>
            {alarms.map((data, index) => {
                const borderColor = data.borderColor;
                const textColor = data.textColor;

                return (
                    <div key={index} className="flex items-center gap-3">
                        <div 
                            className={`w-14 h-14 rounded-lg cursor-pointer border flex justify-center items-center text-sm whitespace-pre-line ${textColor} ${borderColor}`}
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