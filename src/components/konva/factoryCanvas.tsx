import { useState } from "react";
import { useRouter } from "next/navigation";
import { Stage, Layer, Group, Rect, Text, Arrow } from 'react-konva';
import { ProcessNode, FactoryCanvasProps } from "@/lib/konva/types";
import { useFactoryNodeHandlers, useFactoryTooltip } from "@/hooks/useKonva";
import { factoryConnections } from "@/lib/konva/mockData";
import { getNodeStyle } from "@/lib/konva/utils";
import { layoutNodes, processNodes } from "@/lib/konva/mockData";


export default function FactoryCanvas({
    width = 800,
    height = 400
}: FactoryCanvasProps) {
    const router = useRouter();

    const { tooltip, showTooltip, hideTooltip } = useFactoryTooltip();
    const { handleNodeClick, handleNodeHover, handleMouseEnter } = useFactoryNodeHandlers();

    const onNodeHover = (node: ProcessNode, x: number, y: number) => {
        handleNodeHover(node, x, y, showTooltip);
    }

    return (
        <div className="bg-gray-400">
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
                    {/* 레이아웃 노드들 */}
                    {layoutNodes.map((node) => {
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
                                    cursor="default"
                                    />

                                    <Text
                                        x={node.x + node.width / 2}
                                        y={node.y + node.height / 2}
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
                    {/* 프로세스 노드들 */}
                    {processNodes.map((node) => {
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
                                    onMouseEnter={(e) => handleMouseEnter(e, node, onNodeHover)}
                                    onMouseLeave={() => hideTooltip()}
                                    />

                                    <Text
                                        x={node.x + node.width / 2}
                                        y={node.y + node.height / 2}
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
