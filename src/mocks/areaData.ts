import { AreaData } from '@/types/mocks';

// 구역별 장비 mock data
export const MockAreaData: AreaData[] = [
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
]