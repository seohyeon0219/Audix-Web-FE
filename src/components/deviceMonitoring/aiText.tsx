import { MockDeviceData } from "@/mocks";

interface AiTextProps {
    areaId: string;
    deviceId: string;
}

interface AiTextResult {
    status: 'warning' | 'danger' | 'normal' | 'repair' | 'offline';
    message: string;
}

// mock data
const AI_DATA = (status: string, deviceName: string): string => {
    switch(status) {
        case 'normal':
            return '정상 작동 중인 장비입니다.'
        case 'warning':
            return '점검 요망인 장비입니다.'
        case 'danger':
            return '위험 장비입니다.'
        case 'offline':
            return '마이크 미연결 장비입니다.'
        case 'repair':
            return '수리 중인 장비입니다.'
        default:
            return 'AI 진단 데이터를 불러올 수 없습니다.'
    }
}

// 상태별 스타일링 설정
const getStatusStyle = (status: AiTextResult['status']): { icon: string } => {
    switch(status) {
        case 'danger':
            return {
                icon: '🚨'
            };
        case 'warning':
            return {
                icon: '⚠️'
            };
        case 'normal':
            return {
                icon: '✅'
            };
        case 'offline' :
            return {
                icon: '🔌'
            };
        case 'repair' :
            return {
                icon: '❓'
            };
        default:
            return {
                icon: '❓'
            };
    }
}


export default function AiText({ areaId, deviceId }: AiTextProps) {
    // mockDeviceData에서 해당 장비 찾기
    const device = MockDeviceData.find(d => 
        d.areaId === parseInt(areaId) &&
        d.deviceId === parseInt(deviceId)
    );

    // 장비를 찾지 못한 경우 기본값 설정
    if (!device) {
        const defaultResult: AiTextResult = {
            status: 'offline',
            message: '해당 장비를 찾을 수 없습니다.'
        }
        const statusStyle = getStatusStyle(defaultResult.status);

        return (
            <div className="bg-main-100 p-6 rounded-lg h-full flex flex-col">
                <div className="mb-4 flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">{statusStyle.icon}</span>
                        <h3 className="text-white text-lg font-medium">AI 상태진단</h3>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <p className="text-white">{defaultResult.message}</p>
                </div>
            </div>
        );
    }
    // 장비를 찾은 경우 mock data로 결과 생성
    const result: AiTextResult = {
        status: device.status as AiTextResult['status'],
        message: AI_DATA(device.status || 'normal', device.name)
    };
    
    const statusStyle = getStatusStyle(result.status);

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