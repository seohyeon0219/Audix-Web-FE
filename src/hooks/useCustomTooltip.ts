import { useState } from 'react';

interface TooltipState {
  visible: boolean;
  content: string;
  x: number;
  y: number;
}

export const useCustomTooltip = () => {
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    content: '',
    x: 0,
    y: 0,
  });

  const showTooltip = (content: string, e: React.MouseEvent) => {
    setTooltip({
      visible: true,
      content,
      x: e.pageX, // 페이지 전체 기준 x 좌표
      y: e.pageY, // 페이지 전체 기준 y 좌표
    });
  };

  const hideTooltip = () => {
    setTooltip(prevState => ({ ...prevState, visible: false }));
  };

  return { tooltip, showTooltip, hideTooltip };
};