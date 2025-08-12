'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// 아래 타입 정의, Provider, 훅은 areaHoverContext에만 종속적이므로 한 파일 안에 위치시킴

// 메인 화면에서 공장 맵 구역 호버 시 타입 정의 
interface AreaHoverContextType {
    hoveredAreaId: number | null;
    setHoveredAreaId: (areaId: number | null) => void;
}

// 구역 호버 상태 전역 관리
const AreaHoverContext = createContext<AreaHoverContextType | undefined>(undefined);

// 구역 호버 상태를 하위 컴포넌트에 전달
export const AreaHoverProvider = ({ children }: { children: ReactNode }) => {
    const [hoveredAreaId, setHoveredAreaId] = useState<number | null>(null);

    return (
        <AreaHoverContext.Provider value={{ hoveredAreaId, setHoveredAreaId }}>
            {children}
        </AreaHoverContext.Provider>
    )
}

// 구역 호버 상태를 사용하기 위한 커스텀 훅
export const useAreaHover = () => {
    const context = useContext(AreaHoverContext);
    if (context === undefined) {
        throw new Error('useAreaHover must be used within an AreaHoverProvider');
    }
    return context;
}