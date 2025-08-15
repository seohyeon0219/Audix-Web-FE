import { useRouter } from "next/navigation";
import { Stage, Layer, Group, Shape, Text, Arrow } from 'react-konva';
import { ProcessNode, FactoryCanvasProps, Point } from "@/types/konva/index";
import { useFactoryNodeRouter, useFactoryTooltip } from "@/hooks/konva";
import { factoryConnections } from "@/mocks/konva/index";
import { getNodeStyle } from "@/utils/konva/index";
import { processNodes } from "@/mocks/konva/index";
import { getStatusStyleFromString } from "@/utils/statusUtils";
import { useAreaHover } from "@/contexts/areaHover";
import { useAreaHighlighted } from "@/hooks/konva/useAreaHighlighted";
import CenteredText from '@/components/konva/centeredText';

export default function FactoryCanvas({
    width = 900,
    height = 400
}: FactoryCanvasProps) {

    const router = useRouter();
    const { hoveredAreaId, setHoveredAreaId } = useAreaHover();
    const { tooltip, showTooltip, hideTooltip } = useFactoryTooltip();
    const { handleNodeClick, handleNodeHover, handleMouseEnter } = useFactoryNodeRouter();
    const nodeStyles = useAreaHighlighted(processNodes, hoveredAreaId);

    const onNodeHover = (node: ProcessNode, x: number, y: number) => {
        handleNodeHover(node, x, y, showTooltip);
    }

    // 둥근 모서리를 가진 다각형을 그리는 함수
    const drawRoundedPolygon = (context: any, shape: any, points: Point[], radius: number = 20) => {
        if (points.length < 3) return;

        context.beginPath();

        for (let i = 0; i < points.length; i++) {
            const current = points[i];
            const next = points[(i + 1) % points.length];
            const prev = points[i === 0 ? points.length - 1 : i - 1];

            // 현재 점에서 이전/다음 점으로의 벡터 계산
            const prevVector = {
                x: current.x - prev.x,
                y: current.y - prev.y
            };
            const nextVector = {
                x: next.x - current.x,
                y: next.y - current.y
            };

            // 벡터 정규화
            const prevLength = Math.sqrt(prevVector.x * prevVector.x + prevVector.y * prevVector.y);
            const nextLength = Math.sqrt(nextVector.x * nextVector.x + nextVector.y * nextVector.y);

            const prevUnit = {
                x: prevVector.x / prevLength,
                y: prevVector.y / prevLength
            };
            const nextUnit = {
                x: nextVector.x / nextLength,
                y: nextVector.y / nextLength
            };

            // 둥근 모서리를 위한 제어점 계산
            const controlRadius = Math.min(radius, prevLength / 2, nextLength / 2);

            const startPoint = {
                x: current.x - prevUnit.x * controlRadius,
                y: current.y - prevUnit.y * controlRadius
            };

            const endPoint = {
                x: current.x + nextUnit.x * controlRadius,
                y: current.y + nextUnit.y * controlRadius
            };

            if (i === 0) {
                context.moveTo(startPoint.x, startPoint.y);
            } else {
                context.lineTo(startPoint.x, startPoint.y);
            }

            // 둥근 모서리 그리기
            context.quadraticCurveTo(current.x, current.y, endPoint.x, endPoint.y);
        }

        context.closePath();
        context.fillStrokeShape(shape);
    };

    return (
        <div>
            <Stage width={width} height={height}>
                <Layer>
                    {/* 프로세스 노드들 - Shape로 불규칙한 다각형 그리기 */}
                    {processNodes.map((node) => {
                        const nodeStyle = nodeStyles[node.id];
                        const isHighlighted = hoveredAreaId === node.areaId;

                        return (
                            <Group
                                key={node.id}
                                offsetY={isHighlighted ? -5 : 0}
                            >
                                <Shape
                                    sceneFunc={(context, shape) => {
                                        drawRoundedPolygon(context, shape, node.points, 15);
                                    }}
                                    fill={nodeStyle.fill}
                                    stroke={nodeStyle.stroke}
                                    strokeWidth={nodeStyle.strokeWidth}
                                    cursor={node.level === 'process' ? 'pointer' : 'default'}
                                    onClick={() => handleNodeClick(node.id)}
                                    onMouseEnter={(e) => {
                                        handleMouseEnter(e, node, onNodeHover);
                                        setHoveredAreaId(node.areaId);
                                    }}
                                    onMouseLeave={() => {
                                        hideTooltip();
                                        setHoveredAreaId(null);
                                    }}
                                    // 뜨는 효과
                                    offsetY={isHighlighted ? -5 : 0}
                                    shadowColor={isHighlighted ? '#0F0F0F' : 'transparent'}
                                    shadowBlur={isHighlighted ? 10 : 0}
                                    shadowOffset={isHighlighted ? { x: 0, y: 5 } : { x: 0, y: 0 }}
                                    opacity={isHighlighted ? 0.9 : 0.8}
                                />

                                <CenteredText
                                    x={node.textX}
                                    y={node.textY}
                                    text={node.name}
                                    fontSize={node.level === 'process' ? 14 : 16}
                                    fontStyle={node.level !== 'process' ? 'bold' : 'normal'}
                                    fill={nodeStyle.textColor}
                                    listening={false} // 텍스트는 마우스 이벤트 받지 않음
                                />
                            </Group>
                        )
                    })}

                    {/* 툴팁 */}
                    {/* {tooltip.visible && (
                        <Group x={tooltip.x + 10} y={tooltip.y - 40}>
                            <Shape
                                sceneFunc={(context, shape) => {
                                    context.beginPath();
                                    context.roundRect(0, 0, 120, 40, 5);
                                    context.closePath();
                                    context.fillStrokeShape(shape);
                                }}
                                fill='rgba(0,0,0,0.8)'
                                stroke='#ffffff'
                                strokeWidth={1}
                            />
                            <Text
                                text={`${tooltip.data.name}`}
                                x={10}
                                y={8}
                                fontSize={12}
                                fill="#ffffff"
                                align="left"
                            />
                        </Group>
                    )} */}
                </Layer>
            </Stage>
        </div>
    )
}