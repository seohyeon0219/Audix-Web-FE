import { useRouter } from "next/navigation";
import { Stage, Layer, Group, Rect, Text, Arrow } from 'react-konva';
import { ProcessNode, FactoryCanvasProps } from "@/types/konva/index";
import { useFactoryNodeRouter, useFactoryTooltip } from "@/hooks/konva";
import { factoryConnections } from "@/mocks/konva/index";
import { getNodeStyle } from "@/utils/konva/index";
import { layoutNodes, processNodes } from "@/mocks/konva/index";
import { getStatusStyleFromString } from "@/utils/statusUtils";
import { useAreaHover } from "@/contexts/areaHover";
import { useAreaHighlighted } from "@/hooks/konva/useAreaHighlighted";

export default function FactoryCanvas({
    width = 800,
    height = 400
}: FactoryCanvasProps) {

    const router = useRouter();
    const { hoveredAreaId } = useAreaHover();
    const { tooltip, showTooltip, hideTooltip } = useFactoryTooltip();
    const { handleNodeClick, handleNodeHover, handleMouseEnter } = useFactoryNodeRouter();
    const nodeStyles = useAreaHighlighted(processNodes, hoveredAreaId);
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
                            opacity={hoveredAreaId !== null ? 0.5 : 1}
                        />
                    ))}
                    {/* 레이아웃 노드들 */}
                    {layoutNodes.map((node) => {
                        const levelStyle = getNodeStyle(node.level);
                        const opacity = hoveredAreaId !== null ? 0.5 : 1;

                        return (
                            <Group key={node.id} opacity={opacity}>
                                <Rect
                                    x={node.x}
                                    y={node.y}
                                    width={node.width}
                                    height={node.height}
                                    fill={levelStyle.fill}
                                    stroke={levelStyle.stroke}
                                    strokeWidth={levelStyle.strokeWidth}
                                    cursor="default"
                                    />

                                    <Text
                                        x={node.x + node.width / 2}
                                        y={node.y + node.height / 2}
                                        text={node.name}
                                        fontSize={node.level === 'process' ? 14 : 16}
                                        fontStyle={node.level !== 'process' ? 'bold' : 'normal'}
                                        fill={levelStyle.textColor}
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
                        const nodeStyle = nodeStyles[node.id];
                        const statusStyle = getStatusStyleFromString(node.status);
                        const isHighlighted = hoveredAreaId === node.areaId;

                        return (
                            <Group key={node.id}>
                                <Rect
                                    x={node.x}
                                    y={node.y}
                                    width={node.width}
                                    height={node.height}
                                    fill={nodeStyle.fill}
                                    stroke={isHighlighted ? nodeStyle.stroke : statusStyle.hexColor}
                                    strokeWidth={nodeStyle.strokeWidth}
                                    // cornerRadius={8}
                                    cursor={node.level === 'process' ? 'pointer' : 'default'}
                                    onClick={() => handleNodeClick(node.id)}
                                    onMouseEnter={(e) => handleMouseEnter(e, node, onNodeHover)}
                                    onMouseLeave={() => hideTooltip()}
                                    // 뜨는 효과
                                    offsetY={isHighlighted ? -5 : 0}
                                    shadowColor={isHighlighted ? '#0F0F0F' : 'transparent'}
                                    shadowBlur={isHighlighted ? 10 : 0}
                                    shadowOffset={isHighlighted ? { x: 0, y: 5} : { x: 0, y: 0}}
                                    />

                                    <Text
                                        x={node.x + node.width / 2}
                                        y={node.y + node.height / 2}
                                        text={node.name}
                                        fontSize={node.level === 'process' ? 14 : 16}
                                        fontStyle={node.level !== 'process' ? 'bold' : 'normal'}
                                        fill={nodeStyle.textColor}
                                        align="center"
                                        verticalAlign="middle"
                                        offsetX={node.name.length * (node.level === 'process' ? 7 : 8)}
                                        offsetY={isHighlighted ? 12 : 7}
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
