# Audix Web Frontend - AI 기반 산업용 이상음 감지 웹 애플리케이션

🖥️ **웹 개요**

Audix Web Frontend는 자동차 공장의 기계 이상음을 실시간으로 모니터링하고 관리할 수 있는 Next.js 기반 웹 애플리케이션입니다. 관리자가 데스크톱 환경에서 공장 전체 상황을 한눈에 파악하고 효율적으로 관리할 수 있도록 설계되었습니다.

## 개발 실행

```bash
# 개발 서버 시작 (포트 3001)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm start
```

## ✨ 주요 기능

### 🔔 실시간 알림
- 모달 알림을 통한 즉시 이상 징후 전달
- 브라우저 네이티브 알림 지원
- Safety 알람 우선순위 처리 (위험, 점검요망, 안전)

### 📊 실시간 모니터링 대시보드
- 공장별/장비별 실시간 상태 대시보드
- 소리 데이터의 정상도 표현 (Konva 기반 차트)
- 소리 데이터의 알람 건수 표현 (Konva 기반 차트)
- 이상 감지 현황 실시간 업데이트

### 🏭 다중 공장 관리
- 여러 공장 간 빠른 전환
- 공장별 장비 목록 및 상태
- 실시간 WebSocket 연결을 통한 즉시 업데이트

### 🎨 인터랙티브 차트
- Konva 기반 고성능 2D 캔버스 렌더링
- Recharts를 활용한 다양한 데이터 시각화
- 실시간 정상도 도넛 차트

## 🛠️ 기술 스택

### Core
- **Next.js 15** - React 기반 풀스택 프레임워크
- **React 19** - 최신 React 프레임워크
- **TypeScript** - 정적 타입 검사

### UI/UX
- **Tailwind CSS 4** - 유틸리티 퍼스트 CSS 프레임워크
- **React Hot Toast** - 알림 토스트 메시지

### 데이터 시각화
- **Konva & React-Konva** - 고성능 2D 캔버스 렌더링
- **Recharts** - React 기반 차트 라이브러리
- **Canvas** - 서버사이드 캔버스 렌더링

### 실시간 통신
- **Socket.IO Client** - WebSocket 기반 실시간 통신

## 📁 프로젝트 구조

```
audix-web-fe/
├── src/
│   ├── app/
│   │   ├── area/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── devices/
│   │   │   └── [areaId]/
│   │   │       └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── common/
│   │   │   ├── sidebarItem.tsx
│   │   │   └── loadingSpinner.tsx
│   │   ├── charts/
│   │   │   └── donutChart.tsx
│   │   └── modals/
│   │       └── alertModal.tsx
│   ├── hooks/
│   │   ├── useWebSocketAlerts.ts
│   │   └── useAreaData.ts
│   ├── constants/
│   │   ├── sidebarItems.ts
│   │   └── websocket/
│   │       └── client.ts
│   ├── types/
│   │   ├── alert.ts
│   │   ├── device.ts
│   │   └── api.ts
│   └── utils/
│       ├── api.ts
│       └── auth.ts
├── public/
│   ├── logos/
│   │   ├── logoWhite.png
│   │   └── logoNavy.png
│   └── images/
│       └── login/
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── eslint.config.mjs
```

## 🚀 시작하기

### 사전 요구사항
- Node.js 18+
- npm 또는 yarn
- 최신 브라우저 (Chrome, Firefox, Safari, Edge)

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 브라우저에서 확인
# http://localhost:3001
```

## 📱 주요 화면

### 1. 로그인 페이지
- 사원번호 + 비밀번호를 통한 간편한 인증

### 2. 전체 구역(Area) 페이지
- 전체 공장 상태 요약
- 최근 7일 공장 상태 확인 가능
- 이번 달 알람 건수 확인 가능
- 구역 카드 목록
- 구역 카드와 연동된 공장 맵 구현

### 3. 장비(Device) 페이지
- 공장 내 장비 위치·배치를 Konva 캔버스로 구현
- 장비 노드에 상태 색상 반영, 마우스 hover 시 툴팁 제공

### 4. 장비 상세 페이지
- 장비별 상세 모니터링
- 실시간 소리 데이터를 도넛 차트로 표현
- Recharts 기반 고성능 차트 (정상도, 알람 건수)

### 5. 실시간 알림 시스템
- 모달 기반 알림 표시
- 브라우저 네이티브 알림
- Safety 알람 우선순위 처리


## 🔐 보안 및 코드 품질

### 개발 도구
- **ESLint** - 코드 품질 검사
- **TypeScript strict** 모드 활성화
- **Next.js** 내장 보안 기능 활용

### 브라우저 호환성
- 모던 브라우저 지원 (ES2020+)
- 브라우저 네이티브 알림 API 활용
- 반응형 디자인으로 다양한 화면 크기 지원

## 🌐 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작 (포트 3001)
npm start
```

## 📋 환경 변수

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:8080
```

---

**Audix Web Frontend** - AI 기반 자동차 공장 이상음 실시간 감지·알람 시스템