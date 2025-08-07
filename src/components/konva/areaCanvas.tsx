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

export default function AreaCanvas({ areaId, width = 800, height = 500 }: AreaCanvasProps) {

    const router = useRouter();
    const areaIdNum = parseInt(areaId);

    // 마우스 호버 시 보여줄 툴팁 데이터
    const [tooltip, setTooltip] = useState<{
        visible: boolean;
        x: number;
        y: number;
        data: any;
        type?: 'device' | 'conveyor' | null;
    }>({
        visible: false,
        x: 0,
        y: 0,
        data: null,
        type: null
    });

    // 1. 해당 구역의 mock data 가져오기
    const areaDevices = MockDeviceData.filter(device => device.areaId === areaIdNum);

    // 2. 해당 구역의 layout 정보 가져오기
    const areaLayout = getAreaLayout(areaIdNum);

    // 3. 장비 데이터와 좌표 정보 결합
    const devicesWithPositions = areaDevices.map(device => {
        const position = areaLayout?.devices.find(d => d.deviceId === device.deviceId);
        return {
            ...device,
            x: position?.x || 0,
            y: position?.y || 0
        }
    });

    // 장비 클릭 핸들러
    const handleDeviceClick = (deviceId: string) => {
        router.push(`/area/${areaId}/device/${deviceId}`);
    };

    // 장비 호버 핸들러
    const handleDeviceHover = (device: any, x: number, y: number) => {
        setTooltip({
            visible: true,
            x: x,
            y: y,
            data: {
                name: device.name,
                status: device.status,
                manager: device.deviceManager                    
            }
        });
    };

    const handleDeviceLeave = () => {
        setTooltip({
            visible: false,
            x: 0,
            y: 0,
            data: null
        });
    };

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
                            status={device.status}
                            onClick={handleDeviceClick}
                            onHover={handleDeviceHover}
                            onLeave={handleDeviceLeave}
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