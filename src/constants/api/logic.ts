import { API_BASE_URL, API_ENDPOINTS, tokenManager, type HttpMethod, type ApiResponse, type ApiError } from './config';

// ✅ 추가: 서버 실제 응답 구조 타입 정의
interface ServerResponse<T = any> {
    statusCode: number;
    message: string;
    data: T;
}

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

            const result: ServerResponse<T> = await response.json();

            // statusCode가 200-299 범위면 성공
            if (result.statusCode >= 200 && result.statusCode < 300) {
                return result.data;
            } else {
                throw {
                    status: result.statusCode,
                    message: result.message,
                    details: result
                } as ApiError;
            }

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
    // ✅ 수정: 로그인 - 서버 응답 구조에 맞게 수정
    async login(credentials: { loginCode: string; password: string }) {
        try {
            // ✅ 수정: 서버 응답 타입 정의
            interface LoginResponse {
                accessToken: string;
                refreshToken: string;
                user: {
                    id: number;
                    team_id: number;
                    login_code: string;
                    name: string;
                    email: string;
                    phone: string;
                    position: string;
                    is_active: boolean;
                    created_at: string;
                    updated_at: string;
                };
            }

            const response = await apiClient.post<LoginResponse>(
                API_ENDPOINTS.AUTH.LOGIN,
                credentials,
                false // 로그인은 토큰 불필요
            );

            // ✅ 수정: 로그인 성공 시 토큰 저장
            if (response.accessToken) {
                tokenManager.setTokens(response.accessToken, response.refreshToken);
                console.log('🔑 토큰 저장 완료:', {
                    accessToken: response.accessToken.substring(0, 20) + '...',
                    refreshToken: response.refreshToken.substring(0, 20) + '...'
                });
            }

            return {
                success: true,
                data: response,
                user: response.user
            };
        } catch (error) {
            console.error('❌ 로그인 실패:', error);
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
};

// ============================================
// 디바이스 관련 API 로직
// ============================================
// Device 관련 API
export const deviceLogic = {
    // 특정 구역의 모든 장비 목록 가져오기
    async getDevicesByArea(areaId: number): Promise<ApiResponse<any[]>> {
        try {
            console.log(`🔍 API 호출 전: /device/list/${areaId}`);
            const devices = await apiClient.get<any[]>(API_ENDPOINTS.DEVICE.LIST_BY_AREA(areaId));
            console.log(`🔍 API 응답 후:`, devices);
            return {
                success: true,
                data: devices
            };
        } catch (error) {
            console.error(`지역 ${areaId}의 디바이스 목록 조회 실패:`, error);
            return {
                success: false,
                data: []
            };
        }
    },

    // 특정 장비 상세 정보 가져오기  
    async getDeviceDetail(deviceId: number): Promise<ApiResponse<any>> {
        try {
            const data = await apiClient.get<any>(API_ENDPOINTS.DEVICE.DETAIL(deviceId));
            return {
                success: true,
                data: data,
                message: '장비 정보를 성공적으로 가져왔습니다.'
            };
        } catch (error: any) {
            console.error('❌ 장비 정보 가져오기 실패:', error);
            return {
                success: false,
                data: null,
                error: error.message || '장비 정보를 가져오는데 실패했습니다.'
            };
        }
    },
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