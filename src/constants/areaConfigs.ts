import { machine } from "os";
import { StatusType, getStatusFromValue } from "./statusColor";

interface AreaConfig {
    machines: Array<{
        id: string;
        x: number;
        y: number;
        status?: StatusType;
        value?: number;
        name: string;
    }>;
    conveyors: Array<{
        points: number[];
    }>;
}

const AREA_CONFIGS: Record<string, AreaConfig> = {
    'area1' : {
        machines: [
            { id: '1', name: '기계A', x: 300, y: 200, value: 0.85 },
            { id: '2', name: '기계B', x: 500, y: 200, value: 0.45 },
            { id: '3', name: '기계C', x: 700, y: 200, value: 0.15 },
            { id: '4', name: '로봇팔A', x: 300, y: 400, value: 0.92 },
            { id: '5', name: '로봇팔B', x: 500, y: 400, status: 'offline' },
            { id: '6', name: '로봇팔C', x: 700, y: 400, status: 'repair' },
        ],
        conveyors: [
            { points: [200, 200, 900, 200]},
            { points: [200, 200, 200, 400]},
            { points: [200, 400, 900, 400]}
        ]
    },
    'area2' : {
        machines: [
            { id: '1', name: '기계C', x: 200, y: 200, value: 0.92 },
            { id: '2', name: '기계B', x: 200, y: 100, value: 0.45 },
            { id: '3', name: '기계A', x: 300, y: 100, value: 0.85 },
            { id: '4', name: '로봇팔A', x: 150, y: 200, value: 0.15 },
            { id: '5', name: '로봇팔B', x: 250, y: 200, status: 'offline' },
            { id: '6', name: '로봇팔C', x: 350, y: 200, status: 'repair' },
        ],
        conveyors: [
            { points: [100, 100, 200, 150]},
            { points: [200, 150, 300, 200]},
            { points: [150, 300, 250, 250]}
        ]
    }
} 

// 구역 ID에 따라 해당 구역의 설정 데이터를 반환하는 함수
export const getAreaConfig = (areaId: string) => {
    return AREA_CONFIGS[areaId] || AREA_CONFIGS['area1']
}

// 장비의 현재 상태를 반환하는 함수
export const getMachineStatus = (machine: AreaConfig['machines'][0]): StatusType => {
    if (machine.status) {
        return machine.status;
    }

    if (machine.value !== undefined) {
        return getStatusFromValue(machine.value);
    }
    return 'warning';
}