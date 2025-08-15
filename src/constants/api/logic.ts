import { API_BASE_URL, API_ENDPOINTS, tokenManager, type HttpMethod, type ApiResponse, type ApiError } from './config';

// 기본 fetch 래퍼 함수
class ApiClient {
    private baseURL: string;

    constructor(baseURL: string = API_BASE_URL) {
        this.baseURL = baseURL;
    }

    private async request<T>(
        endpoint: string,
        method: HttpMethod = 'GET',
        data?: any,
        requireAuth: boolean = true
    ): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        // 인증이 필요한 경우 토큰 추가
        if (requireAuth && tokenManager.hasValidToken()) {
            headers['Authorization'] = `Bearer ${tokenManager.getAccessToken()}`;
        }

        const config: RequestInit = {
            method,
            headers,
        };

        // GET이 아닌 경우 body 추가
        if (data && method !== 'GET') {
            config.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const apiError: ApiError = {
                    status: response.status,
                    message: errorData.message || `HTTP error! status: ${response.status}`,
                    details: errorData
                };
                throw apiError;
            }

            const result: ApiResponse<T> = await response.json();

            if (!result.success) {
                throw {
                    status: 400,
                    message: result.error || result.message || 'API call failed',
                    details: result
                } as ApiError;
            }

            return result.data;
        } catch (error) {
            if (error instanceof Error) {
                throw {
                    status: 0,
                    message: error.message,
                    details: error
                } as ApiError;
            }
            throw error;
        }
    }

    // GET 요청
    async get<T>(endpoint: string, requireAuth: boolean = true): Promise<T> {
        return this.request<T>(endpoint, 'GET', undefined, requireAuth);
    }

    // POST 요청
    async post<T>(endpoint: string, data?: any, requireAuth: boolean = true): Promise<T> {
        return this.request<T>(endpoint, 'POST', data, requireAuth);
    }

    // PUT 요청
    async put<T>(endpoint: string, data?: any, requireAuth: boolean = true): Promise<T> {
        return this.request<T>(endpoint, 'PUT', data, requireAuth);
    }

    // DELETE 요청
    async delete<T>(endpoint: string, requireAuth: boolean = true): Promise<T> {
        return this.request<T>(endpoint, 'DELETE', undefined, requireAuth);
    }
}

// API 클라이언트 인스턴스
const apiClient = new ApiClient();

// ============================================
// 인증 관련 API 로직
// ============================================
export const authLogic = {
    // 로그인
    async login(credentials: { loginCode: string; password: string }) {
        try {
            const response = await apiClient.post<{ accessToken: string; refreshToken?: string; user: any }>(
                API_ENDPOINTS.AUTH.LOGIN,
                credentials,
                false // 로그인은 토큰 불필요
            );

            // 로그인 성공 시 토큰 저장
            if (response.accessToken) {
                tokenManager.setTokens(response.accessToken, response.refreshToken);
            }

            return {
                success: true,
                data: response,
                user: response.user
            };
        } catch (error) {
            console.error('로그인 실패:', error);
            return {
                success: false,
                error: error as ApiError
            };
        }
    },

    // 로그아웃
    async logout() {
        try {
            await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
            tokenManager.clearTokens();
            return { success: true };
        } catch (error) {
            // 로그아웃은 실패해도 로컬 토큰은 삭제
            tokenManager.clearTokens();
            return { success: true };
        }
    },

    // 토큰 갱신
    async refreshToken() {
        try {
            const refreshToken = tokenManager.getRefreshToken();
            if (!refreshToken) {
                throw new Error('Refresh token not found');
            }

            const response = await apiClient.post<{ accessToken: string }>(
                API_ENDPOINTS.AUTH.REFRESH,
                { refreshToken },
                false
            );

            tokenManager.setTokens(response.accessToken);
            return { success: true, accessToken: response.accessToken };
        } catch (error) {
            tokenManager.clearTokens();
            return { success: false, error: error as ApiError };
        }
    }
};

// ============================================
// 지역 관련 API 로직
// ============================================
export const areaLogic = {
    // 지역 목록 조회
    async getList() {
        try {
            const areas = await apiClient.get<any[]>(API_ENDPOINTS.AREA.LIST);
            return {
                success: true,
                data: areas
            };
        } catch (error) {
            console.error('지역 목록 조회 실패:', error);
            return {
                success: false,
                error: error as ApiError,
                data: []
            };
        }
    },

    // 특정 지역 조회
    async getById(id: number) {
        try {
            const area = await apiClient.get<any>(API_ENDPOINTS.AREA.DETAIL(id));
            return {
                success: true,
                data: area
            };
        } catch (error) {
            console.error(`지역 ${id} 조회 실패:`, error);
            return {
                success: false,
                error: error as ApiError,
                data: null
            };
        }
    }
};

// ============================================
// 디바이스 관련 API 로직
// ============================================
export const deviceLogic = {
    // 특정 지역의 디바이스 목록 조회
    async getListByAreaId(areaId: number) {
        try {
            const devices = await apiClient.get<any[]>(API_ENDPOINTS.DEVICE.LIST_BY_AREA(areaId));
            return {
                success: true,
                data: devices
            };
        } catch (error) {
            console.error(`지역 ${areaId}의 디바이스 목록 조회 실패:`, error);
            return {
                success: false,
                error: error as ApiError,
                data: []
            };
        }
    },

    // 특정 디바이스 조회
    async getById(id: number) {
        try {
            const device = await apiClient.get<any>(API_ENDPOINTS.DEVICE.DETAIL(id));
            return {
                success: true,
                data: device
            };
        } catch (error) {
            console.error(`디바이스 ${id} 조회 실패:`, error);
            return {
                success: false,
                error: error as ApiError,
                data: null
            };
        }
    },

    // 디바이스 수정
    async update(id: number, updateData: any) {
        try {
            const device = await apiClient.put<any>(API_ENDPOINTS.DEVICE.UPDATE(id), updateData);
            return {
                success: true,
                data: device
            };
        } catch (error) {
            console.error(`디바이스 ${id} 수정 실패:`, error);
            return {
                success: false,
                error: error as ApiError
            };
        }
    },

    // 디바이스 삭제
    async delete(id: number) {
        try {
            await apiClient.delete(API_ENDPOINTS.DEVICE.DELETE(id));
            return {
                success: true
            };
        } catch (error) {
            console.error(`디바이스 ${id} 삭제 실패:`, error);
            return {
                success: false,
                error: error as ApiError
            };
        }
    }
};

// ============================================
// 분석 관련 API 로직
// ============================================
export const analysisLogic = {
    // 오디오 분석 요청
    async analyzeAudio(audioFile: File | Blob) {
        try {
            const formData = new FormData();
            formData.append('audio', audioFile);

            // FormData 전송을 위한 별도 요청
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ANALYSIS.AUDIO}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${tokenManager.getAccessToken()}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return {
                success: true,
                data: result.data
            };
        } catch (error) {
            console.error('오디오 분석 실패:', error);
            return {
                success: false,
                error: error as ApiError
            };
        }
    },

    // 분석 히스토리 조회
    async getHistory(params?: { page?: number; limit?: number; deviceId?: number }) {
        try {
            const queryParams = new URLSearchParams();
            if (params?.page) queryParams.append('page', params.page.toString());
            if (params?.limit) queryParams.append('limit', params.limit.toString());
            if (params?.deviceId) queryParams.append('deviceId', params.deviceId.toString());

            const endpoint = `${API_ENDPOINTS.ANALYSIS.HISTORY}?${queryParams.toString()}`;
            const history = await apiClient.get<any[]>(endpoint);

            return {
                success: true,
                data: history
            };
        } catch (error) {
            console.error('분석 히스토리 조회 실패:', error);
            return {
                success: false,
                error: error as ApiError,
                data: []
            };
        }
    },

};