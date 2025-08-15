// ============================================
// 📁 src/api/config.ts
// API 기본 설정 및 엔드포인트 등록만 담당
// ============================================

// API Base URL
export const API_BASE_URL = 'http://localhost:3000';

// API 엔드포인트 경로들 정의
export const API_ENDPOINTS = {
    // 인증 관련
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh'
    },

    // 지역 관련
    AREA: {
        LIST: '/area/list',
        DETAIL: (id: number) => `/area/${id}`
    },

    // 디바이스 관련
    DEVICE: {
        LIST_BY_AREA: (areaId: number) => `/device/list/${areaId}`,
        DETAIL: (id: number) => `/device/${id}`,
        UPDATE: (id: number) => `/device/${id}`,
        DELETE: (id: number) => `/device/${id}`
    },

    // 분석 관련
    ANALYSIS: {
        AUDIO: '/analysis/audio',
        HISTORY: '/analysis/history',
        REPORT: (id: number) => `/analysis/report/${id}`
    }
} as const;

// HTTP 메서드 타입 정의
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// API 응답 타입 정의
export interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
}

// API 에러 타입 정의
export interface ApiError {
    status: number;
    message: string;
    details?: any;
}

// 토큰 관리 (단순 저장소 역할만)
class TokenManager {
    private accessToken: string | null = null;
    private refreshToken: string | null = null;

    setTokens(accessToken: string, refreshToken?: string) {
        this.accessToken = accessToken;
        if (refreshToken) {
            this.refreshToken = refreshToken;
        }
    }

    getAccessToken(): string | null {
        return this.accessToken;
    }

    getRefreshToken(): string | null {
        return this.refreshToken;
    }

    clearTokens() {
        this.accessToken = null;
        this.refreshToken = null;
    }

    hasValidToken(): boolean {
        return !!this.accessToken;
    }
}

export const tokenManager = new TokenManager();