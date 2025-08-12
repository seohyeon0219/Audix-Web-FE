'use client';

interface CustomTooltipProps {
  visible: boolean;
  content: string;
  x: number;
  y: number;
}

export default function CustomTooltip({ visible, content, x, y }: CustomTooltipProps) {
  if (!visible) {
    return null;
  }

  return (
    <div 
      className="fixed z-50 bg-black/80 text-white text-xs px-3 py-2 rounded-md pointer-events-none"
      style={{ 
        left: x + 15, 
        top: y + 15 
      }}
    >
      {content}
    </div>
  );
}