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
        id: 3,
        name: '차체 31라인',
        address: '울산 현대자동차 31라인',
        status: 'normal'
    },
    {
        id: 4,
        name: '도장 31라인',
        address: '울산 현대자동차 31라인',
        status: 'warning'
    },
    {
        id: 5,
        name: '의장 31라인',
        address: '울산 현대자동차 31라인',
        status: 'danger'
    },
];

// API 응답을 AreaData 형식으로 변환하는 함수
const transformApiToAreaData = (apiData: any[]): AreaData[] => {
    return apiData.map((item) => ({
        id: item.id,
        name: item.name,
        address: item.address || item.explain || '주소 정보 없음',
        status: item.status || 'normal'
    }));
};

// 동기적으로 사용할 수 있는 MockAreaData (초기값은 정적 데이터)
export let MockAreaData: AreaData[] = [...staticMockAreaData];

// 🔧 개선: 현재 데이터가 API에서 온 것인지 확인하는 플래그
let isApiDataLoaded = false;

// 이벤트 발생 헬퍼 함수
const dispatchMockDataUpdateEvent = () => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('mockAreaDataUpdated', {
            detail: {
                data: MockAreaData,
                isApiData: isApiDataLoaded
            }
        }));
    }
};

// MockAreaData를 API 데이터로 업데이트하는 함수 (로그인 성공 시 호출)
export const updateMockAreaData = async (): Promise<boolean> => {
    try {
        console.log('🔄 MockAreaData 업데이트 시작...');

        const result = await areaLogic.getList();

        if (result.success && result.data) {
            const transformedData = transformApiToAreaData(result.data);

            // 배열 참조를 유지하면서 내용만 교체
            MockAreaData.length = 0;
            MockAreaData.push(...transformedData);

            // ✅ API 데이터 로드 완료 표시
            isApiDataLoaded = true;

            // 커스텀 이벤트 발생
            dispatchMockDataUpdateEvent();

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

// 🔧 개선: 로그아웃 시에만 사용하는 함수
export const clearMockAreaDataOnLogout = (): void => {
    MockAreaData.length = 0;
    MockAreaData.push(...staticMockAreaData);
    isApiDataLoaded = false;

    dispatchMockDataUpdateEvent();
    console.log('🔒 로그아웃 - MockAreaData를 정적 데이터로 초기화');
};

// 🔧 개선: 개발용 - 강제 리셋 (개발/디버깅 목적만)
export const forceResetMockAreaData = (): void => {
    if (process.env.NODE_ENV === 'development') {
        MockAreaData.length = 0;
        MockAreaData.push(...staticMockAreaData);
        isApiDataLoaded = false;

        dispatchMockDataUpdateEvent();
        console.log('🛠️ [개발모드] MockAreaData 강제 리셋');
    } else {
        console.warn('⚠️ 프로덕션 환경에서는 강제 리셋을 사용할 수 없습니다.');
    }
};

// 🔧 개선: 현재 데이터 상태 확인 함수
export const getMockAreaDataStatus = () => ({
    isApiDataLoaded,
    dataCount: MockAreaData.length,
    data: [...MockAreaData]
});

// 🔧 개선: API 데이터 새로고침 (기존 API 데이터가 있을 때만)
export const refreshMockAreaData = async (): Promise<boolean> => {
    if (!isApiDataLoaded) {
        console.log('💡 API 데이터가 로드되지 않았습니다. updateMockAreaData()를 먼저 호출하세요.');
        return false;
    }

    console.log('🔄 API 데이터 새로고침...');
    return await updateMockAreaData();
};