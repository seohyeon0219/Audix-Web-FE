export default function LoginPage() {
    return (
        <div className="min-h-screen flex justify-center items-center bg-login-gray">
            <div className="w-[650px] h-[400px] bg-white rounded-3xl">
                {/* 네이비 박스 내 */}
                <div className="w-[300px] h-[400px] bg-login-navy rounded-l-3xl flex flex-col p-3">
                    {/* 상단 로고 + 간단한 설명 */}
                    <div className="flex flex-col items-end">
                        <img src="../../../logos/logoWhite.png" alt="흰색 로고" width={150}></img>
                        <p className="text-sm text-white">AI 기계 이상음 감지 시스템</p>
                    </div>
                    {/* 가운데 로봇 사진 + 그레이 배경 */}
                    <div className="flex-1 relative">
                        {/* 어두운 그레이 배경 원 */}
                        <img src="../../../images/darkGrayCircle.svg" className="absolute w-72 h-40 bottom-10 left-0 z-0"></img>
                        {/* 밝은 그레이 배경 원 */}
                        <img src="../../../images/lightGrayCircle.svg" className="absolute w-56 h-24 bottom-10 left-12 z-10"></img>
                        {/* 로봇 이미지 */}
                        <img src="../../../images/robot.png" className="absolute w-36 h-36 bottom-10 left-20 z-20"></img>
                    </div>
                    {/* 홍보웹 링크 */}
                    <div>
                        <p className="text-white text-xs">아래 링크로 문의바랍니다.</p>
                        <p className="text-white text-xs">홍보웹 이동 링크</p>
                    </div>
                </div>
            </div>
        </div>
    )
}