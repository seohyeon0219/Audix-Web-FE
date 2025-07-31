'use client';

// 전체 구역 지도 메인 컨테이너
import { useState } from 'react';

import { Stage, Layer } from 'react-konva';
import MachineNode from '@/components/konva/machineNode';
import ConveyorLine from '@/components/konva/conveyorLine';
import NodeTooltip from '@/components/konva/nodeTooltip';
import { getAreaConfig } from '@/constants/areaConfigs';

interface AreaCanvasProps {
    areaId: string; // 어떤 구역인지 식별
    width?: number; // 캔버스 가로 크기
    height?: number; // 캔버스 세로 크기
}

export default function AreaCanvas({ areaId, width, height }: AreaCanvasProps) {

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
    const handleMachineClick = (id: string) => {
        console.log('Machine clicked', id);
    };

    // 장비 호버 핸들러
    const handleMachineHover = (id: string, x: number, y: number) => {
        if (id) {
            const machine = machines.find(m => m.id === id);
            if (machine) {
                setTooltip({
                    visible: true,
                    x: x,
                    y: y,
                    type: 'machine',
                    data: {
                        name: machine.name,
                        status: machine.status,                        
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
                status: "정상 작동 중"
            }
        });
    };
    
    // 툴팁 숨기기
    const handleTooltipHide = () => {
        setTooltip(prev => ({ ...prev, visible: false }));
    };

     return (
        <div className='border '> 
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
                            status={machine.status}
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