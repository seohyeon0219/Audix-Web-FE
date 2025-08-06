import { MockAreaData, MockDeviceData } from "@/mocks";
import { AreaData } from "@/types/areaType";
import { DeviceData } from '@/types/deviceType';

interface MachineInfoProps {
    areaId: string;
    machineId: string;
    area?: AreaData;
    device?: DeviceData;
}

// areaId, machindId로 장비 데이터 찾기
const getMachineData = (areaId: string, machineId: string) => {
    // 구역 정보 찾기
    const area = MockAreaData.find(area => area.id === parseInt(areaId));

    // 장비 정보 찾기
    const device = MockDeviceData.find(device => 
        device.areaId === parseInt(areaId) && 
        device.deviceId === parseInt(machineId)
    );

    return { area, device };
}

export default function Info({ areaId, machineId, area: propsArea, device: propsDevice }: MachineInfoProps) {
    const { area, device } = propsArea && propsDevice
        ? { area: propsArea, device: propsDevice }
        : getMachineData(areaId, machineId);

    if (!area || !device) {
        return (
            <div className="bg-navy-100 rounded-lg p-4 border border-t-white h-32 flex items-center justify-center">
                <p className="text-white text-center">장비 정보를 찾을 수 없습니다.</p>
            </div>
        )
    }
        return (
        <div className="flex gap-14 bg-main-100 p-4 border border-t-white">
            {/* 왼쪽 장비 이미지 */}
            <div className="flex shrink-0">
                <div className="w-32 h-32">
                    {device.image && (
                        <img
                            src={device.image}
                            alt={device.name}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
            </div>
            {/* 오른쪽 장비 설명 */}
            <div className="flex-1">
                <h2 className="text-white text-xl font-bold mb-4">{device.name}</h2>
                <table className="w-full text-sm">
                    <tbody>
                        <tr>
                            <td className="text-white p-1">모델</td>
                            <td className="text-white p-1">{device.model}</td>
                        </tr>
                        <tr>
                            <td className="text-white p-1">구역</td>
                            <td className="text-white p-1">{area.name}</td>
                        </tr>

                        <tr>
                            <td className="text-white p-1">위치</td>
                            <td className="text-white p-1">{area.address}</td>
                        </tr>
                        <tr>
                            <td className="text-white p-1">담당자</td>
                            <td className="text-white p-1">{device.deviceManager}</td>
                        </tr>
                        <tr>
                            <td className="text-white p-1">부품</td>
                            <td className="text-white p-1">{device.parts ? Object.keys(device.parts).join(', ') : '부품 정보가 없습니다.'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}