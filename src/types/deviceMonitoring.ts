import { AreaData } from "@/types/mocks";
import { DeviceData } from '@/types/mocks';

// aiText
export interface AiTextProps {
    areaId: string;
    deviceId: string;
}

export interface AiTextResult {
    status: 'warning' | 'danger' | 'normal' | 'repair' | 'offline';
    message: string;
}


// info
export interface DeviceInfoProps {
    areaId: string;
    deviceId: string;
    area?: AreaData;
    device?: DeviceData;
}


