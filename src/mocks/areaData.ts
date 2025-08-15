import { AreaData } from "@/types/models/area";
import { areaLogic } from "@/constants/api/logic";

// 기존 정적 mock data (fallback용)
const staticMockAreaData: AreaData[] = [
    {
        id: 1,
        name: '3공장 프레스 구역',
        address: '울산 현대자동차 31라인',
        status: 'normal'
    },
    {
        id: 2,
        name: '차체 31라인',
        address: '울산 현대자동차 31라인',
        status: 'normal'
    },
    {
        id: 3,
        name: '도장 31라인',
        address: '울산 현대자동차 31라인',
        status: 'warning'
    },
    {
        id: 4,
        name: '의장 31라인',
        address: '울산 현대자동차 31라인',
        status: 'danger'
    },
];

// API 응답을 AreaData 형식으로 변환하는 함수
const transformApiToAreaData = (apiData: any[]): AreaData[] => {
    return apiData.map((item) => ({
        id: item.id,                    // API의 id 그대로
        name: item.name,                // API의 name 그대로
        address: item.address || item.explain || '주소 정보 없음', // address 또는 explain 사용
        status: item.status || 'normal' // API의 status 그대로, 없으면 'normal'
    }));
};

// 동기적으로 사용할 수 있는 MockAreaData (초기값은 정적 데이터)
export let MockAreaData: AreaData[] = staticMockAreaData;

// MockAreaData를 API 데이터로 업데이트하는 함수 (로그인 성공 시 호출)
export const updateMockAreaData = async (): Promise<boolean> => {
    try {
        console.log('🔄 MockAreaData 업데이트 시작...');

        const result = await areaLogic.getList();

        if (result.success && result.data) {
            const transformedData = transformApiToAreaData(result.data);
            MockAreaData = transformedData;

            console.log('✅ MockAreaData 업데이트 완료:', MockAreaData);
            return true;
        } else {
            console.warn('⚠️ API 데이터 없음, 기존 MockAreaData 유지');
            return false;
        }
    } catch (error) {
        console.error('❌ MockAreaData 업데이트 실패:', error);
        return false;
    }
};

// MockAreaData를 정적 데이터로 리셋하는 함수
export const resetMockAreaData = (): void => {
    MockAreaData = [...staticMockAreaData];
    console.log('🔄 MockAreaData를 정적 데이터로 리셋');
};