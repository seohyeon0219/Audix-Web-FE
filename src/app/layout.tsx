// src/app/layout.tsx
'use client';

import React from 'react';
import { useWebSocketAlerts } from '@/hooks/useWebSocketAlerts';
import NotificationModal from '@/components/common/NotificationModal';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    currentAlert,
    isModalVisible,
    isConnected,
    hideAlert
  } = useWebSocketAlerts();

  return (
    <html lang="ko">
      <body>
        {/* 메인 콘텐츠 */}
        <div id="root">
          {children}
        </div>

        {/* WebSocket 연결 상태 표시 (개발용) */}
        <div className="fixed top-4 right-4 z-40">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${isConnected
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
            }`}>
            WebSocket: {isConnected ? 'Connected' : 'Disconnected'}
          </div>
        </div>

        {/* 알림 모달 */}
        <NotificationModal
          isVisible={isModalVisible}
          data={currentAlert}
          onClose={hideAlert}
        />
      </body>
    </html>
  );
}