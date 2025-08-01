import { getAreaConfig } from "@/constants/areaConfigs";

interface MachineInfoData {
    id: string;
    name: string;
    model: string;
    location: string;
    manager: string;
    description: string;
    imageUrl?: string;
}

interface MachineInfoProps {
    areaId: string; // 구역 ID (1이라면 area1)
    machineId: string; // 장비 ID 
}

// mock data 상세 정보 (areaConfig.ts의 기본 정보에 추가하는 정보들)
const MACHINE_DETAILS: Record<string, Omit<MachineInfoData, 'id' | 'name'>> = {
    'area1-1': {
        model: 'FANUC R-2000iC',
        location: 'A-1구역',
        manager: '김서현',
        description: 'FANUC αi Series Servo Motor, Harmonic Drive CSG Series',
        imageUrl: '/images/machines/robotArm.png'
    },
    'area1-2': {
        model: 'KUKA KR 16-2',
        location: 'A-1구역',
        manager: '이하은',
        description: 'High precision welding robot with advanced motion control',
        imageUrl: '/images/machines/robotArm2.png'
    },
    'area1-3': {
        model: 'ABB IRB 6700',
        location: 'A-1구역',
        manager: '김재걸',
        description: 'Heavy duty industrial robot for material handling',
        imageUrl: '/images/machines/robotArm3.png'
    },
    'area1-4': {
        model: 'FANUC LR Mate 200iD',
        location: 'A-1구역',
        manager: '김현민',
        description: 'Compact robot arm for precision assembly tasks',
        imageUrl: '/images/machines/robotArm.png'
    },
    'area1-5': {
        model: 'KUKA KR 10 R1100',
        location: 'A-1구역',
        manager: '도종명',
        description: 'Medium payload robot for flexible manufacturing',
        imageUrl: '/images/machines/robotArm.png'
    },
    'area1-6': {
        model: 'Universal Robots UR10',
        location: 'A-1구역',
        manager: '김서현',
        description: 'Collaborative robot for human-robot interaction',
        imageUrl: '/images/machines/robotArm.png'
    },
}

// areaConfig에서 기본 장비 정보 가져오기
const getMachineData = (areaId: string, machineId: string): MachineInfoData | null => {
    // areaConfig에서 기본 정보 가져오기
    const areaConfig = getAreaConfig(areaId);
    const machine = areaConfig.machines.find((m: any) => m.id === machineId);

    if (!machine) return null;

    // 상세 정보 가져오기
    const detailKey = `area${areaId}-${machineId}`;
    const details = MACHINE_DETAILS[detailKey];

    if (!details) return null;

    // 두 데이터 합쳐서 반환
    return {
        id: machine.id,
        name: machine.name,
        ...details
    }
}

export default function Info({ areaId, machineId }: MachineInfoProps) {
    const machineData = getMachineData(areaId, machineId);

    if (!machineData) {
        return (
            <div className="bg-navy-100 rounded-lg p-4 border border-t-white">
                <p className="text-white text-center">장비 정보를 찾을 수 없습니다.</p>
            </div>
        )
    }
        return (
        <div className="flex gap-14 bg-main-100 p-4 border border-t-white">
            {/* 왼쪽 장비 이미지 */}
            <div className="flex shrink-0">
                <div className="w-32 h-32">
                    {machineData.imageUrl && (
                        <img
                            src={machineData.imageUrl}
                            alt={machineData.name}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
            </div>
            {/* 오른쪽 장비 설명 */}
            <div className="flex-1">
                <h2 className="text-white text-xl font-bold mb-4">{machineData.name}</h2>
                <table className="w-full text-sm">
                    <tbody>
                        <tr>
                            <td className="text-white p-1">모델</td>
                            <td className="text-white p-1">{machineData.model}</td>
                        </tr>
                        <tr>
                            <td className="text-white p-1">위치</td>
                            <td className="text-white p-1">{machineData.location}</td>
                        </tr>
                        <tr>
                            <td className="text-white p-1">담당자</td>
                            <td className="text-white p-1">{machineData.manager}</td>
                        </tr>
                        <tr>
                            <td className="text-white p-1">부품</td>
                            <td className="text-white p-1">{machineData.description}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}