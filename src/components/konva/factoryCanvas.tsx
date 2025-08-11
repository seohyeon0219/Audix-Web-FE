import { useState } from "react";
import { useRouter } from "next/navigation";
import { Stage, Layer, Group, Rect, Text, Arrow } from 'react-konva';
import { ProcessNode, FactoryCanvasProps } from "@/lib/konva/types";
import { useFactoryTooltip } from "@/hooks/useKonva";
import { factoryConnections, factoryNodes } from "@/lib/konva/mockData";


export default function FactoryCanvas({
    width = 800,
    height = 400
}: FactoryCanvasProps) {
    const router = useRouter();

    const { tooltip, showTooltip, hideTooltip } = useFactoryTooltip();



    // 레벨별 스타일 정의 함수 추가
    const getNodeStyle = (level: ProcessNode['level']) => {
        switch (level) {
            case 'factory':
                return {
                    fill: '#303957',
                    stroke: '#ffffff',
                    strokeWidth: 2,
                    textColor: '#ffffff'
                };
            case 'line':
                return {
                    fill: '#212E59',
                    stroke: '#ffffff',
                    strokeWidth: 2,
                    textColor: '#ffffff'
                };
            case 'process':
                return {
                    fill: '#ffffff',
                    stroke: '#333333',
                    strokeWidth: 1,
                    textColor: '#333333'
                };
            case 'material':
                return {
                    fill: '#f0f0f0',
                    stroke: '#666666',
                    strokeWidth: 1,
                    textColor: '#333333'
                }
            default:
                return {
                    fill: '#ffffff',
                    stroke: '#333333',
                    strokeWidth: 1,
                    textColor: '#333333'
                };
        };
    }

    // 노드 클릭 핸들러
    const handleNodeClick = (nodeId: string) => {
        if (nodeId === 'process') {
            router.push('/area/1');
        } else if (nodeId === 'material') {
            router.push('/area/2')
        } else if (nodeId === 'painting') {
            router.push('/area/3')
        } else if (nodeId === 'assembly') {
            router.push('/area/4')
        }
    };

    // 노드 호버 핸들러
    const handleNodeHover = (node: ProcessNode, x: number, y: number) => {
        const levelLabel = {
            factory: '공장',
            line: '라인',
            process: '공정',
            material: '차체'
        }[node.level];

        showTooltip(node.name, levelLabel || '알 수 없음', x, y);
    };

    return (
        <div className="border border-white rounded-lg bg-main-900">
            <Stage width={width} height={height}>
                <Layer>
                    {/* 화살표 */}
                    {factoryConnections.map((connection, index) => (
                        <Arrow
                            key={index}
                            points={[
                                connection.from.x,
                                connection.from.y,
                                connection.to.x,
                                connection.to.y
                            ]}
                            stroke="#ffffff"
                            strokeWidth={3}
                            fill="#ffffff"
                            pointerLength={10}
                            pointerWidth={8}
                        />
                    ))}
                    {/* 노드들 */}
                    {factoryNodes.map((node) => {
                        const style = getNodeStyle(node.level);

                        return (
                            <Group key={node.id}>
                                <Rect
                                    x={node.x}
                                    y={node.y}
                                    width={node.width}
                                    height={node.height}
                                    fill={style.fill}
                                    stroke={style.stroke}
                                    strokeWidth={style.strokeWidth}
                                    // cornerRadius={8}
                                    cursor={node.level === 'process' ? 'pointer' : 'default'}
                                    onClick={() => handleNodeClick(node.id)}
                                    onMouseEnter={(e) => {
                                        const pos = e.target.getStage()?.getPointerPosition();
                                        if (pos) handleNodeHover(node, pos.x, pos.y);
                                    }}
                                    onMouseLeave={() => hideTooltip()}
                                    />

                                    <Text
                                        x={node.x + node.width / 2}
                                        y={node.y + (node.level === 'factory' || node.level === 'line' ? 20 : node.height / 2)}
                                        text={node.name}
                                        fontSize={node.level === 'process' ? 14 : 16}
                                        fontStyle={node.level !== 'process' ? 'bold' : 'normal'}
                                        fill={style.textColor}
                                        align="center"
                                        verticalAlign="middle"
                                        offsetX={node.name.length * (node.level === 'process' ? 7 : 8)}
                                        offsetY={7}
                                    />
                            </Group>
                        )
                    })}

                    {tooltip.visible && (
                        <Group x={tooltip.x + 10} y={tooltip.y - 40}>
                            <Rect
                                width={120}
                                height={40}
                                fill='rgba(0,0,0,0.8)'
                                stroke='#ffffff'
                                strokeWidth={1}
                                cornerRadius={5}
                            />
                            <Text
                                text={`${tooltip.data.name}\n${tooltip.data.level}`}
                                x={10}
                                y={8}
                                fontSize={12}
                                fill="#ffffff"
                                align="left"
                            />
                        </Group>
                    )}
                </Layer>
            </Stage>
        </div>
    )

}
