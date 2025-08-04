'use client';

// 전체 구역 지도 메인 컨테이너
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Stage, Layer } from 'react-konva';
import MachineNode from '@/components/konva/machineNode';
import ConveyorLine from '@/components/konva/conveyorLine';
import NodeTooltip from '@/components/konva/nodeTooltip';
import { getAreaConfig, getMachineStatus } from '@/constants/areaConfigs';
import { StatusType } from "@/constants/statusColor";

interface AreaCanvasProps {
    areaId: string; // 어떤 구역인지 식별
    width?: number; // 캔버스 가로 크기
    height?: number; // 캔버스 세로 크기
}

export default function AreaCanvas({ areaId, width, height }: AreaCanvasProps) {

    const router = useRouter();

    // 마우스 호버 시 보여줄 툴팁 데이터
    const [tooltip, setTooltip] = useState<{
        visible: boolean;
        x: number;
        y: number;
        data: any;
        type: 'machine' | 'conveyor' | null;
    }>({
        visible: false,
        x: 0,
        y: 0,
        data: null,
        type: null
    });

    // areaConfig에서 mock data 불러오기
    const areaConfig = getAreaConfig(areaId);
    const machines = areaConfig.machines;
    const conveyors = areaConfig.conveyors;

    // 장비 클릭 핸들러
    const handleMachineClick = (machineId: string) => {
        console.log('Machine clicked', machineId);
        console.log('Area ID', areaId)
        router.push(`/area/${areaId}/machine/${machineId}`);
    };

    // 장비 호버 핸들러
    const handleMachineHover = (id: string, x: number, y: number) => {
        if (id) {
            const machine = machines.find(m => m.id === id);
            if (machine) {
                const machineStatus = getMachineStatus(machine);

                const getStatusLabel = (status: StatusType) => {
                    switch (status) {
                        case 'safe': return '안전';
                        case 'warning': return '점검요망';
                        case 'danger': return '위험';
                        case 'offline': return '미연결';
                        case 'repair': return '수리중';
                        default: return '알 수 없음';
                    }
                }
                // 기본 값 설정
                const status = machine.status || 'offline';

                setTooltip({
                    visible: true,
                    x: x,
                    y: y,
                    type: 'machine',
                    data: {
                        name: machine.name,
                        status: getStatusLabel(machineStatus),                        
                    }
                });
            }
        } else {
            setTooltip(prev => ({ ...prev, visible: false}));
        }
    };

    // 컨베이어 호버 핸들러
    const handleConveyorHover = (type: string, x: number, y: number) => {
        setTooltip({
            visible: true,
            x,
            y,
            type: 'conveyor',
            data: {
                name: "컨베이어 벨트",
                // status: "정상 작동 중"
            }
        });
    };
    
    // 툴팁 숨기기
    const handleTooltipHide = () => {
        setTooltip(prev => ({ ...prev, visible: false }));
    };

     return (
        <div className='border border-white'> 
            <Stage width={width} height={height}>
                <Layer>
                    {/* 컨베이어 */}
                    {conveyors.map((conveyor, index) => (
                        <ConveyorLine
                            key={index}
                            points={conveyor.points}
                            onHover={handleConveyorHover}
                            onLeave={handleTooltipHide}
                    />
                    ))}
                    {/* 장비 */}
                    {machines.map(machine => (
                        <MachineNode
                            key={machine.id}
                            id={machine.id}
                            name={machine.name}
                            x={machine.x}
                            y={machine.y}
                            status={getMachineStatus(machine)}
                            onClick={handleMachineClick}
                            onHover={handleMachineHover}
                            onLeave={handleTooltipHide}
                        />
                    ))}
                    {/* 툴팁 */}
                    {tooltip.visible && (
                        <NodeTooltip x={tooltip.x} y={tooltip.y} visible={tooltip.visible} data={tooltip.data} ></NodeTooltip>
                    )}
                </Layer>
            </Stage>
        </div>
        
    )

}