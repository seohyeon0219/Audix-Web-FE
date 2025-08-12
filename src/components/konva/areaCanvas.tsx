'use client';

// 전체 구역 지도 메인 컨테이너
import { Stage, Layer } from 'react-konva';
import DeviceNode from '@/components/konva/deviceNode';
import ConveyorLine from '@/components/konva/conveyorLine';
import NodeTooltip from '@/components/konva/nodeTooltip';
import { useDeviceInteraction } from '@/hooks/konva';
import { useAreaData } from '@/hooks/konva';
import { useAreaTooltip } from '@/hooks/konva';
import { AreaCanvasProps } from '@/types/props/areaCanvas';
import ConveyorArrows from './arrow';

export default function AreaCanvas({ areaId, width, height }: AreaCanvasProps) {

    const { tooltip, showTooltip, hideTooltip } = useAreaTooltip();
    const { handleClick, handleHover } = useDeviceInteraction(areaId, showTooltip);
    const { devicesWithPositions, areaLayout } = useAreaData(areaId);
    
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
                    {/* 화살표 */}
                    <ConveyorArrows arrow={areaLayout?.arrows} />
                    {/* 장비 */}
                    {devicesWithPositions.map(device => (
                        <DeviceNode
                            key={device.deviceId}
                            id={device.deviceId.toString()}
                            name={device.name}
                            model={device.model}
                            x={device.x}
                            y={device.y}
                            areaId={parseInt(areaId)}
                            status={device.status}
                            onClick={handleClick}
                            onHover={handleHover}
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