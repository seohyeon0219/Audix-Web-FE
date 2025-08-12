// components/konva/ConveyorArrows.tsx
'use client';

import { Shape } from 'react-konva';
import { ArrowData } from '@/types/konva';

interface ConveyorArrowsProps {
    arrow?: ArrowData[];
}

export default function ConveyorArrows({ arrow }: ConveyorArrowsProps) {
  if (!arrow) {
    return null;
  }

  const ARROW_WIDTH = 10;
  const ARROW_HEIGHT = 30;

  return (
    <>
      {arrow.map((arrow, index) => {
        // 1. 데이터로부터 화살표 꼭짓점 위치(x, y)와 각도(angle)를 직접 가져옵니다.
        const { x, y, angle } = arrow;

        // 2. 각도를 degree에서 radian으로 변환합니다.
        const angleRad = angle * (Math.PI / 180);

        // 3. 화살표(꺽쇠)를 구성하는 세 개의 점 계산
        // 화살표의 꼭짓점
                const tipPoint = { x, y };

                // 화살표 날개의 기준점 (꼭짓점에서 깊이만큼 뒤로 이동)
                const basePoint = {
                    x: x - ARROW_WIDTH * Math.cos(angleRad),
                    y: y - ARROW_WIDTH * Math.sin(angleRad),
                };

                // 화살표의 왼쪽 날개 끝점
                const wingPoint1 = {
                    x: basePoint.x - (ARROW_HEIGHT / 2) * Math.sin(angleRad),
                    y: basePoint.y + (ARROW_HEIGHT / 2) * Math.cos(angleRad),
                };
                
                // 화살표의 오른쪽 날개 끝점
                const wingPoint2 = {
                    x: basePoint.x + (ARROW_HEIGHT / 2) * Math.sin(angleRad),
                    y: basePoint.y - (ARROW_HEIGHT / 2) * Math.cos(angleRad),
                };

        return (
          <Shape
            key={`arrow-${index}`}
            sceneFunc={(context, shape) => {
                context.beginPath();
                context.moveTo(wingPoint1.x, wingPoint1.y); // 왼쪽 날개에서 시작
                context.lineTo(tipPoint.x, tipPoint.y);    // 꼭짓점으로 이동
                context.lineTo(wingPoint2.x, wingPoint2.y); // 오른쪽 날개로 이동
                context.strokeShape(shape);
            }}
            stroke="#8EC8FF"
            strokeWidth={6}
          />
        );
      })}
    </>
  );
}