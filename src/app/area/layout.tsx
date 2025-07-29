import SidebarItem from "../../components/common/sidebarItem";

export default function AreaLayout({ children } : { children: React.ReactNode; }) {
    return (
        <div className="flex min-h-screen bg-main-900">
            {/* side bar */}
            <aside className="flex flex-col items-center gap-8 min-h-screen w-52 bg-main-100 py-6">
                {/* 상단 영역 : 로고 + 사용자 정보 */}
                <img 
                    src="../../../../logos/logoWhite.png" 
                    alt="audix white logo" 
                    width={150}
                >
                </img>
                {/* 로그인한 회원 정보 */}
                <div className="text-center space-y-2">
                    <p className="text-sm text-white font-medium">김서현 님</p>
                    <p className="text-xs text-white">현대자동차</p>
                </div>
                {/* 네비게이션 버튼 */}
                <nav className="flex-1 mt-8">
                    <ul className="space-y-10">
                        <li>
                            <SidebarItem
                                href="/area"
                            >홈</SidebarItem>
                        </li>
                        <li>
                            <SidebarItem
                                href="/"
                            >마이크 확인</SidebarItem>
                        </li>
                        <li>
                            <SidebarItem
                                href="/"
                            >문의하기</SidebarItem>
                        </li>
                        <li>
                            <SidebarItem
                                href="/"
                            >마이페이지</SidebarItem>
                        </li>
                    </ul>
                </nav>
                {/* 로그아웃 버튼 */}
                <div className="h-0.5 w-full bg-white"></div>
                <div>
                    <SidebarItem 
                        href="/login"
                    className="border border-white">LOGOUT</SidebarItem>
                </div>
            </aside>
            {/* 메인 컨텐츠 */}
            <main className="flex-1 p-10">
                {children}
            </main>
        </div>
    )
}