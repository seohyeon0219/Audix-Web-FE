import SidebarButton from "../../components/common/sidebarButton";

export default function AreaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-main-900">
            {/* side bar */}
            <aside className="flex flex-col items-center gap-8 min-h-screen w-56 bg-main-100 p-6">
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
                <nav className="flex-1">
                    <ul className="space-y-2">
                        <li>
                            <SidebarButton>홈</SidebarButton>
                        </li>
                        <li>
                            <SidebarButton>마이크 확인</SidebarButton>
                        </li>
                        <li>
                            <SidebarButton>문의하기</SidebarButton>
                        </li>
                        <li>
                            <SidebarButton>마이페이지</SidebarButton>
                        </li>
                        {/* 로그아웃 버튼 */}
                        <li>
                            <SidebarButton className="border-1 border-white">로그아웃</SidebarButton>
                        </li>
                    </ul>
                </nav>
      
            </aside>
            {/* 메인 컨텐츠 */}
            <main>{children}</main>
        </div>
    )
}