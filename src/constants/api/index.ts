// config에서 필요한 것들 export
export { API_BASE_URL, API_ENDPOINTS, tokenManager } from './config';
export type { HttpMethod, ApiResponse, ApiError } from './config';

// logic에서 모든 API 함수들 export
import { authLogic, areaLogic, deviceLogic, analysisLogic } from './logic';

// 편의를 위한 통합 객체
export const api = {
    auth: authLogic,
    area: areaLogic,
    device: deviceLogic,
    analysis: analysisLogic
};

// ============================================
// 📁 사용 예시 (components/example.ts)
// ============================================

/*
// 1. 개별 import 방식
import { authLogic, areaLogic, deviceLogic } from '@/api/logic';

const handleLogin = async () => {
  const result = await authLogic.login({ loginCode: 'admin', password: '1234' });
  if (result.success) {
    console.log('로그인 성공:', result.user);
  } else {
    console.error('로그인 실패:', result.error);
  }
};

const loadAreas = async () => {
  const result = await areaLogic.getList();
  if (result.success) {
    console.log('지역 목록:', result.data);
  }
};

// 2. 통합 객체 사용 방식
import { api } from '@/api';

const handleLogin = async () => {
  const result = await api.auth.login({ loginCode: 'admin', password: '1234' });
  if (result.success) {
    console.log('로그인 성공:', result.user);
  }
};

const loadDevices = async (areaId: number) => {
  const result = await api.device.getListByAreaId(areaId);
  if (result.success) {
    console.log('디바이스 목록:', result.data);
  }
};
*/