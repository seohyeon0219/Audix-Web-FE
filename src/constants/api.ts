// API Base URL
const API_BASE_URL = 'http://localhost:3000';

// Token 관리
let accessToken: string | null = null;

// 토큰 설정 함수
export const setAccessToken = (token: string) => {
    accessToken = token;
};

// 토큰 가져오기 함수
export const getAccessToken = (): string | null => {
    return accessToken;
};

// HTTP 요청 헬퍼 함수
const apiRequest = async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any,
    requireAuth: boolean = true
) => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    // 인증이 필요한 경우 토큰 추가
    if (requireAuth && accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const config: RequestInit = {
        method,
        headers,
    };

    if (body && method !== 'GET') {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${url}`, config);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

// API 함수들
export const authApi = {
    // 로그인 (토큰 불필요)
    login: async (credentials: { loginCode: string; password: string }) => {
        const response = await apiRequest('/auth/login', 'POST', credentials, false);

        // 로그인 성공 시 토큰 저장
        if (response.accessToken) {
            setAccessToken(response.accessToken);
        }

        return response;
    }
};

export const areaApi = {
    // 지역 목록 조회 (토큰 필요)
    getList: async () => {
        return await apiRequest('/area/list');
    }
};

export const deviceApi = {
    // 특정 지역의 디바이스 목록 조회 (토큰 필요)
    getListByAreaId: async (areaId: number) => {
        return await apiRequest(`/device/list/${areaId}`);
    },

    // 특정 디바이스 조회 (토큰 필요)
    getById: async (id: number) => {
        return await apiRequest(`/device/${id}`);
    }
};

// 통합 API 객체 (선택적으로 사용)
export const api = {
    auth: authApi,
    area: areaApi,
    device: deviceApi
};
