import { MockAreaData, MockDeviceData } from "@/mocks";
import { DeviceInfoProps } from "@/types/props/deviceInfo";
import { useSearchArea } from "@/hooks/konva/useSearchArea";
import { useSearchDevice, useSearchDevices } from "@/hooks/konva/useSearchDevice";

export default function Info({ areaId, deviceId, area: propsArea, device: propsDevice }: DeviceInfoProps) {

    const { area } = useSearchArea(areaId);
    const { device } = useSearchDevice(areaId, deviceId);

    if (!area || !device) {
        return (
            <div className="bg-navy-100 rounded-lg p-4 border border-t-white h-32 flex items-center justify-center">
                <p className="text-white text-center">장비 정보를 찾을 수 없습니다.</p>
            </div>
        )
    }
    
        return (
        <div className="flex gap-14 bg-main-100 p-4 border border-t-white max-w-7xl">
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
                            <td className="text-white p-1">장비 상세 위치</td>
                            <td className="text-white p-1">{device.address}</td>
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