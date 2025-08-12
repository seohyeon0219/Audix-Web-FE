'use client';

import { useRouter } from "next/navigation";
import SidebarItem from "@/components/common/sidebarItem";
import { SIDEBAR_ITEMS } from "@/constants/sideBarItems";

export default function AreaLayout({ children } : { children: React.ReactNode; }) {

    const router = useRouter();

    return (
        <div className="flex min-h-screen bg-main-900">
            {/* side bar */}
            <aside className="flex flex-col items-start gap-6 min-h-screen w-40 p-6">
                {/* 상단 영역 : 로고 + 사용자 정보 */}
                <img 
                    src="../../../../logos/logoWhite.png" 
                    alt="audix white logo" 
                    className="cursor-pointer"
                    width={100}
                    onClick={() => router.push("/area")}
                >
                </img>
                {/* 로그인한 회원 정보 */}
                {/* <div className="text-center space-y-2">
                    <p className="text-sm text-white font-medium">김서현 님</p>
                    <p className="text-xs text-white">현대자동차</p>
                </div> */}
                {/* side bar 버튼 */}
                <nav className="flex-1 mt-6">
                    <ul className="space-y-10">
                        {SIDEBAR_ITEMS.map((item) => (
                            <li key={item.label}>
                                <SidebarItem href={item.href}>
                                    {item.label}
                                </SidebarItem>
                            </li>
                        ))}
                    </ul>
                </nav>
                {/* 로그아웃 버튼 */}
                <div className="h-0.5 w-full bg-white"></div>
                <div>
                    <SidebarItem 
                        href="/login"
                        className="border-white"
                        >LOGOUT
                    </SidebarItem>
                </div>
            </aside>
            {/* 메인 컨텐츠 */}
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    )
}