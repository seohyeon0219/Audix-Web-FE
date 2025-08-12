export interface AiTextProps {
    aiText: string;
    status: 'normal' | 'warning' | 'danger' | 'repair' | 'offline';
}

export interface UseAiTextProps {
    areaId: string;
    deviceId: string;
}