import type { Metadata } from "next";
import "./globals.css";

// title : 브라우저 탭에 표시되는 제목, description : 검색 엔진, 소셜 미디어에서 보이는 설명 
export const metadata: Metadata = {
  title: "Audix",
  description: "자동차 공장에서 발생하는 기계 소리를 AI로 실시간 분석하여, 이상 징후 및 사고 위험을 감지하고 앱과 웹을 통해 알림과 통계 정보를 제공하는 AI 기반 이상음 감지 시스템",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return ( 
    <html lang="ko">
      <head>
        {/* 구글 아이콘 */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body className="antialiased"> 
        {children}
      </body>
    </html>
  );
}
