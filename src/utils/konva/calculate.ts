// 구역 맵 페이지에서 텍스트 가로를 계산해서 좌우 중앙에 오도록 x좌표 계산
export const calculateTextOffset = (text: string, multiplier: number): number => {
    return text.length * multiplier;
};

// 구역 맵 페이지에서 텍스트 높이를 계산해서 상하 중앙에 오도록 y좌표 계산
export const calculateTextY = (baseY: number, fontSize: number): number => {
    return baseY = fontSize / 2;
}
