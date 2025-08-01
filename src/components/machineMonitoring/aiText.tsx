interface AiTextProps {
    areaId: string;
    machineId: string;
    // status: 'warning' | 'danger' | 'safe';
    // message: string;
    // icon: string;
}

interface AiTextResult {
    status: 'warning' | 'danger' | 'safe';
    message: string;
}

// mock data
const AI_DATA: Record<string, AiTextResult> = {
    '1-1': {
        status: 'safe',
        message: '정상 작동 중입니다. 모든 센서 값이 안정 범위 내에 있습니다.'
    },
    '1-2': {
        status: 'warning',
        message: '비정상적인 소음이 감지되었습니다. 점검 요망합니다.'
    },
    '1-3': {
        status: 'danger',
        message: '위험 수준의 센서 값이 확인되었습니다. 작동을 중지하고 점검 바랍니다.'
    }
}

// 상태별 스타일링 설정
const getStatusStyle = (status: AiTextResult['status']) => {
    switch(status) {
        case 'danger':
            return {
                icon: '🚨'
            };
        case 'warning':
            return {
                icon: '⚠️'
            };
        case 'safe':
            return {
                icon: '✅'
            };
    }
}


export default function AiText({ areaId, machineId }: AiTextProps) {
    // 함수 호출
    const machineKey = `${areaId}-${machineId}`
    const aiResult = AI_DATA[machineKey] || {
        status: 'warning' as const,
        message: 'AI 진단 데이터를 불러올 수 없습니다.'
    }
    const statusStyle = getStatusStyle(aiResult.status);

    return (
        <div className="bg-main-100 p-6 rounded-lg">
            <div className="mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-lg">{statusStyle.icon}</span>
                    <h3 className="text-white text-lg font-medium">AI 상태진단</h3>
                </div>
            </div>
            <div>
                <p className="text-white">{aiResult.message}</p>
            </div>
        </div>
    )
}