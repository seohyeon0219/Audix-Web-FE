'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import LoginForm from "@/components/auth/loginForm";
import Button from "@/components/auth/button";
import { api } from "@/constants/api";

export default function LoginPage() {
    const router = useRouter();

    // 폼 상태 관리
    const [formData, setFormData] = useState({
        loginCode: '',
        password: ''
    });

    // 로딩 및 에러 상태
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 입력값 변경 핸들러
    const handleInputChange = (field: 'loginCode' | 'password', value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // 입력할 때 에러 메시지 제거
        if (error) setError(null);
    };

    // 로그인 핸들러
    const handleLogin = async () => {
        // 입력값 검증
        if (!formData.loginCode.trim()) {
            setError('사원번호를 입력해주세요.');
            return;
        }

        if (!formData.password.trim()) {
            setError('비밀번호를 입력해주세요.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            console.log("로그인 시도:", formData);

            // API 호출
            const result = await api.auth.login({
                loginCode: formData.loginCode.trim(),
                password: formData.password.trim()
            });

            if (result.success) {
                console.log("로그인 성공:", result.user);

                // 성공 시 지역 페이지로 이동
                router.push('/area');
            } else {
                // 로그인 실패
                const errorMessage = result.error?.message || '로그인에 실패했습니다.';
                setError(errorMessage);
                console.error("로그인 실패:", result.error);
            }
        } catch (error) {
            console.error("로그인 중 오류:", error);
            setError('서버와의 연결에 문제가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    // Enter 키 처리
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isLoading) {
            handleLogin();
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-login-gray">
            <div className="flex w-[700px] h-[500px] bg-white rounded-3xl">
                {/* 왼쪽 네이비 박스 */}
                <div className="w-[300px] h-[500px] bg-login-navy rounded-l-3xl flex flex-col p-6 pt-10">
                    {/* 상단 로고 + 간단한 설명 */}
                    <div className="flex flex-col items-end">
                        <img src="../../../logos/logoWhite.png" alt="audix white logo" width={150}></img>
                        <p className="text-xs text-white">AI 기계 이상음 감지 시스템</p>
                    </div>
                    {/* 가운데 로봇 사진 + 그레이 배경 */}
                    <div className="flex-1 relative">
                        {/* 어두운 그레이 배경 원 */}
                        <img src="/images/login/darkGrayCircle.svg" alt="dark gray circle" className="absolute w-72 h-40 bottom-10 left-0 z-0"></img>
                        {/* 밝은 그레이 배경 원 */}
                        <img src="/images/login/lightGrayCircle.svg" alt="light gray circle" className="absolute w-52 h-24 bottom-10 left-10 z-10"></img>
                        {/* 로봇 이미지 */}
                        <img src="/images/login/robot.png" alt="robot" className="absolute w-36 h-36 bottom-10 left-14 z-20"></img>
                    </div>
                    {/* 홍보웹 이동 */}
                    <div>
                        <a
                            href="http://localhost:3000"
                            className="text-white text-xs underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            홍보 웹 이동
                        </a>
                    </div>
                </div>
                {/* 오른쪽 흰색 박스 */}
                <div className="flex flex-1 flex-col justify-center items-center gap-6">
                    {/* 상단 로그인 */}
                    <div>
                        <h1 className="text-2xl font-black">LOGIN</h1>
                    </div>

                    {/* 에러 메시지 */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm w-72">
                            {error}
                        </div>
                    )}

                    {/* input 컴포넌트 */}
                    <div className="space-y-4" onKeyPress={handleKeyPress}>
                        <LoginForm
                            label="사원번호"
                            placeholder="사원번호를 입력하세요."
                            iconname="person"
                            value={formData.loginCode}
                            onChange={(e) => handleInputChange('loginCode', e.target.value)}
                        />
                        <LoginForm
                            label="비밀번호"
                            placeholder="비밀번호를 입력하세요."
                            iconname="lock"
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                        />
                    </div>

                    {/* 로그인 버튼 */}
                    <Button
                        onClick={handleLogin}
                        className={`${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? '로그인 중...' : '로그인'}
                    </Button>
                </div>
            </div>
        </div>
    )
}