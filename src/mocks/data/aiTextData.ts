// aiText
export const AI_DATA = (status: string, deviceName: string): string => {
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