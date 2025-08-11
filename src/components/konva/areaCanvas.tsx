'use client';

// 전체 구역 지도 메인 컨테이너
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Stage, Layer } from 'react-konva';
import DeviceNode from '@/components/konva/deviceNode';
import ConveyorLine from '@/components/konva/conveyorLine';
import NodeTooltip from '@/components/konva/nodeTooltip';
import { MockDeviceData } from '@/mocks';
import { getAreaLayout } from '@/lib/konva/utils';
import { AreaCanvasProps } from '@/types/areaMonitoring';
import { CANVAS_CONFIG } from '@/lib/konva/config';
import { useHandlers, useTooltip, useAreaData } from '@/hooks/useKonva';
import { useEffect } from 'react';

export default function AreaCanvas({ areaId, width = CANVAS_CONFIG.defaultWidth, height = CANVAS_CONFIG.defaultHeight }: AreaCanvasProps) {

    const { tooltip, showTooltip, hideTooltip } = useTooltip();
    const { handleClick, handleHover } = useHandlers(areaId);
    const { devicesWithPositions, areaLayout } = useAreaData(areaId);

    const onDeviceHover = (deviceId: string, x: number, y: number) => {
        handleHover(deviceId, x, y, showTooltip);
    }
    
     return (
        <div className='border border-white'> 
            <Stage width={width} height={height}>
                <Layer>
                    {/* 컨베이어 */}
                    {areaLayout?.conveyors?.map((conveyor, index) => (
                        <ConveyorLine
                            key={index}
                            points={conveyor.points}
                    />
                    ))}
                    {/* 장비 */}
                    {devicesWithPositions.map(device => (
                        <DeviceNode
                            key={device.deviceId}
                            id={device.deviceId.toString()}
                            name={device.name}
                            x={device.x}
                            y={device.y}
                            areaId={parseInt(areaId)}
                            status={device.status}
                            onClick={handleClick}
                            onHover={onDeviceHover}
                            onLeave={hideTooltip}
                        />
                    ))}
                    {/* 툴팁 */}
                    {tooltip.visible && (
                        <NodeTooltip
                         x={tooltip.x} 
                         y={tooltip.y} 
                         visible={tooltip.visible} 
                         data={tooltip.data} 
                    ></NodeTooltip>
                    )}
                </Layer>
            </Stage>
        </div>
        
    )

}