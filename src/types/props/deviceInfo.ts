import { AreaData } from "@/types/models/area";
import { DeviceData } from '@/types/models/device';

export interface DeviceInfoProps {
    areaId: string;
    deviceId: string;
    area?: AreaData;
    device?: DeviceData;
}
