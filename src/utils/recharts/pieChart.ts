// normalScore를 percentage로 변환
export const convertToPercentage = (normalScore: number): number => {
    return Math.round(normalScore * 100);
}
