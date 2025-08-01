'use client';

import { useRouter } from "next/navigation";

import LoginForm from "@/components/auth/loginForm";
import Button from "@/components/auth/button";

export default function LoginPage() {
    const router = useRouter();

    const handleLogin= () => {
        // 로그인 로직
        console.log("로그인 버튼 클릭")
        router.push('/area')
    }
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
                        <img src="../../../images/darkGrayCircle.svg" alt="dark gray circle" className="absolute w-72 h-40 bottom-10 left-0 z-0"></img>
                        {/* 밝은 그레이 배경 원 */}
                        <img src="../../../images/lightGrayCircle.svg" alt="light gray circle" className="absolute w-52 h-24 bottom-10 left-10 z-10"></img>
                        {/* 로봇 이미지 */}
                        <img src="../../../images/robot.png" alt="robot" className="absolute w-36 h-36 bottom-10 left-14 z-20"></img>
                    </div>
                    {/* 홍보웹 링크 */}
                    <div>
                        <p className="text-white text-xs">아래 링크로 문의바랍니다.</p>
                        <p className="text-white text-xs">홍보웹 이동 링크</p>
                    </div>
                </div>
                {/* 오른쪽 흰색 박스 */}
                <div className="flex flex-1 flex-col justify-center items-center gap-6">
                    {/* 상단 로그인 */}
                    <div>
                        <h1 className="text-2xl font-black">LOGIN</h1>
                    </div>
                    {/* input 컴포넌트 */}
                    <div className="space-y-4">
                        <LoginForm
                            label = "사원번호"
                            placeholder="사원번호를 입력하세요."
                            iconname="person"
                        />
                        <LoginForm
                            label = "비밀번호"
                            placeholder="비밀번호를 입력하세요."
                            iconname="lock"
                        />
                    </div>
                    <Button onClick={handleLogin}>
                        로그인
                    </Button>
                </div>
            </div>
        </div>
    )
}