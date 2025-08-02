import { MachineData, AreaData } from '@/types/areaMachineType';

// 구역별 장비 mock data
const areaA1: AreaData = {
    id: '1',
    name: '울산 제1공장',
    manager: '김서현',
    machines : [
        {
            id: 'A1-M001',
            name: 'Robot Arm',
            model: 'R-2000iC/165F',
            location: '울산 제1공장 1층',
            manager: '김재걸',
            parts: ['Pulse coder', 'moter'],
            value: 0.85
        },
        {
            id: 'A1-M002',
            name: 'Robot Arm',
            model: 'R-2000iC/210F',
            location: '울산 제1공장 1층',
            manager: '김재걸',
            parts: ['Pulse coder', 'moter'],
            value: 0.8
        },
        {
            id: 'A1-M003',
            name: 'Robot Arm',
            model: 'R-2000iC/210L',
            location: '울산 제1공장 1층',
            manager: '김재걸',
            parts: ['Pulse coder', 'moter'],
            value: 0.8
        },
        {
            id: 'A1-M004',
            name: 'Robot Arm',
            model: 'R-2000iC/100P',
            location: '울산 제1공장 1층',
            manager: '김재걸',
            parts: ['Pulse coder', 'moter'],
            value: 0.7
        },
        {
            id: 'A1-M005',
            name: 'Robot Arm',
            model: 'R-2000iC/125L',
            location: '울산 제1공장 1층',
            manager: '김재걸',
            parts: ['Pulse coder', 'moter'],
            value: 0.9
        },
        {
            id: 'A1-M006',
            name: 'Robot Arm',
            model: 'R-2000iC/165R',
            location: '울산 제1공장 1층',
            manager: '김재걸',
            parts: ['Pulse coder', 'moter'],
            value: 0.8
        }
    ]
}

const areaA2: AreaData = {
    id: '2',
    name: '울산 제2공장',
    manager: '김재걸',
    machines : [
        {
            id: 'A2-M001',
            name: 'Robot Arm',
            model: 'R-2000iC/165F',
            location: '울산 제2공장 1층',
            manager: '이하은',
            parts: ['Pulse coder', 'moter'],
            value: 0.7
        },
        {
            id: 'A2-M002',
            name: 'Robot Arm',
            model: 'R-2000iC/210F',
            location: '울산 제2공장 1층',
            manager: '이하은',
            parts: ['Pulse coder', 'moter'],
            value: 0.9
        },
        {
            id: 'A2-M003',
            name: 'Robot Arm',
            model: 'R-2000iC/210L',
            location: '울산 제2공장 1층',
            manager: '이하은',
            parts: ['Pulse coder', 'moter'],
            value: 0.8
        },
        {
            id: 'A2-M004',
            name: 'Robot Arm',
            model: 'R-2000iC/100P',
            location: '울산 제2공장 1층',
            manager: '이하은',
            parts: ['Pulse coder', 'moter'],
            value: 0.9
        },
        {
            id: 'A2-M005',
            name: 'Robot Arm',
            model: 'R-2000iC/125L',
            location: '울산 제2공장 1층',
            manager: '이하은',
            parts: ['Pulse coder', 'moter'],
            value: 0.8
        },
        {
            id: 'A2-M006',
            name: 'Robot Arm',
            model: 'R-2000iC/165R',
            location: '울산 제2공장 1층',
            manager: '이하은',
            parts: ['Pulse coder', 'moter'],
            value: 0.9
        }
    ]
}

const areaA3: AreaData = {
    id: '3',
    name: '울산 제3공장',
    manager: '이하은',
    machines : [
        {
            id: 'A3-M001',
            name: 'Robot Arm',
            model: 'R-2000iC/165F',
            location: '울산 제3공장 1층',
            manager: '김현민',
            parts: ['Pulse coder', 'moter'],
            value: 0.6
        },
        {
            id: 'A3-M002',
            name: 'Robot Arm',
            model: 'R-2000iC/210F',
            location: '울산 제3공장 1층',
            manager: '김현민',
            parts: ['Pulse coder', 'moter'],
            value: 0.5
        },
        {
            id: 'A3-M003',
            name: 'Robot Arm',
            model: 'R-2000iC/210L',
            location: '울산 제3공장 1층',
            manager: '김현민',
            parts: ['Pulse coder', 'moter'],
            value: 0.6
        },
        {
            id: 'A3-M004',
            name: 'Robot Arm',
            model: 'R-2000iC/100P',
            location: '울산 제3공장 1층',
            manager: '김현민',
            parts: ['Pulse coder', 'moter'],
            value: 0.5
        },
        {
            id: 'A3-M005',
            name: 'Robot Arm',
            model: 'R-2000iC/125L',
            location: '울산 제3공장 1층',
            manager: '김현민',
            parts: ['Pulse coder', 'moter'],
            value: 0.6
        },
        {
            id: 'A3-M006',
            name: 'Robot Arm',
            model: 'R-2000iC/165R',
            location: '울산 제3공장 1층',
            manager: '김현민',
            parts: ['Pulse coder', 'moter'],
            value: 0.5
        }
    ]
}

const areaA4: AreaData = {
    id: '4',
    name: '울산 제4공장',
    manager: '김현민',
    machines : [
        {
            id: 'A4-M001',
            name: 'Robot Arm',
            model: 'R-2000iC/165F',
            location: '울산 제4공장 1층',
            manager: '도종명',
            parts: ['Pulse coder', 'moter'],
            value: 0.6
        },
        {
            id: 'A4-M002',
            name: 'Robot Arm',
            model: 'R-2000iC/210F',
            location: '울산 제4공장 1층',
            manager: '도종명',
            parts: ['Pulse coder', 'moter'],
            value: 0.8
        },
        {
            id: 'A4-M003',
            name: 'Robot Arm',
            model: 'R-2000iC/210L',
            location: '울산 제4공장 1층',
            manager: '도종명',
            parts: ['Pulse coder', 'moter'],
            value: 0.4
        },
        {
            id: 'A4-M004',
            name: 'Robot Arm',
            model: 'R-2000iC/100P',
            location: '울산 제4공장 1층',
            manager: '도종명',
            parts: ['Pulse coder', 'moter'],
            value: 0.6
        },
        {
            id: 'A4-M005',
            name: 'Robot Arm',
            model: 'R-2000iC/125L',
            location: '울산 제4공장 1층',
            manager: '도종명',
            parts: ['Pulse coder', 'moter'],
            value: 0.5
        },
        {
            id: 'A4-M006',
            name: 'Robot Arm',
            model: 'R-2000iC/165R',
            location: '울산 제4공장 1층',
            manager: '도종명',
            parts: ['Pulse coder', 'moter'],
            value: 0.5
        }
    ]
}

const areaA5: AreaData = {
    id: '5',
    name: '울산 제5공장',
    manager: '도종명',
    machines : [
        {
            id: 'A5-M001',
            name: 'Robot Arm',
            model: 'R-2000iC/165F',
            location: '울산 제5공장 1층',
            manager: '김서현',
            parts: ['Pulse coder', 'moter'],
            value: 0.85
        },
        {
            id: 'A5-M002',
            name: 'Robot Arm',
            model: 'R-2000iC/210F',
            location: '울산 제5공장 1층',
            manager: '김서현',
            parts: ['Pulse coder', 'moter'],
            value: 0.25
        },
        {
            id: 'A5-M003',
            name: 'Robot Arm',
            model: 'R-2000iC/210L',
            location: '울산 제5공장 1층',
            manager: '김서현',
            parts: ['Pulse coder', 'moter'],
            value: 0.35
        },
        {
            id: 'A5-M004',
            name: 'Robot Arm',
            model: 'R-2000iC/100P',
            location: '울산 제5공장 1층',
            manager: '김서현',
            parts: ['Pulse coder', 'moter'],
            value: 0.7
        },
        {
            id: 'A5-M005',
            name: 'Robot Arm',
            model: 'R-2000iC/125L',
            location: '울산 제5공장 1층',
            manager: '김서현',
            parts: ['Pulse coder', 'moter'],
            value: 0.1
        },
        {
            id: 'A5-M006',
            name: 'Robot Arm',
            model: 'R-2000iC/165R',
            location: '울산 제5공장 1층',
            manager: '김서현',
            parts: ['Pulse coder', 'moter'],
            value: 0.9
        }
    ]
}

// 전체 구역 데이터 배열
export const mockAreaMachineData: AreaData[] = [
    areaA1,
    areaA2,
    areaA3,
    areaA4,
    areaA5
];