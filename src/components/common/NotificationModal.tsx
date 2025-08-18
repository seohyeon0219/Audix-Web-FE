'use client';

// src/components/common/NotificationModal.tsx
import React, { useEffect, useCallback } from 'react';
import { AlarmData } from '@/utils/websocket/client';

interface NotificationModalProps {
    isVisible: boolean;
    data: AlarmData | null;
    onClose: () => void;
}

export default function NotificationModal({ isVisible, data, onClose }: NotificationModalProps) {
    // ESC 키로 모달 닫기
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isVisible) {
                onClose();
            }
        };

        if (isVisible) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden'; // 스크롤 방지
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isVisible, onClose]);

    // 백드롭 클릭 시 모달 닫기
    const handleBackdropClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    if (!isVisible || !data) {
        return null;
    }

    // 상태별 색상 매핑
    const statusColors = {
        danger: '#FF2F16',
        warning: '#FFC525',
        normal: '#1CAA00',
        repair: '#898989',
        offline: '#515151',
    };

    // 상태별 라벨
    const statusLabels = {
        danger: '위험',
        warning: '점검 요망',
        normal: '정상',
        repair: '점검 중',
        offline: '마이크 미연결',
    };

    // 알람 타입별 라벨
    const alarmLabels = {
        machine: '장비 알람',
        safety: '비상 알람',
    };

    const topColor = statusColors[data.status];
    const statusLabel = statusLabels[data.status];
    const alarmType = alarmLabels[data.type];
    const isSafetyAlarm = data.type === 'safety';

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleBackdropClick}
        >
            <div
                className="relative bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 overflow-hidden"
                style={{
                    backgroundColor: isSafetyAlarm ? statusColors.danger : 'white',
                    animation: 'slideInDown 0.4s ease-out'
                }}
            >
                {/* 상단 헤더 */}
                <div
                    className="px-6 py-4 text-center text-white"
                    style={{ backgroundColor: topColor }}
                >
                    <h3 className="text-lg font-medium mb-1">{alarmType}</h3>
                    <h2 className="text-2xl font-bold">{statusLabel}</h2>
                </div>

                {/* 본문 */}
                <div className="p-6 text-center">
                    {/* 지역/위치 정보 */}
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {data.regionName}
                    </h4>
                    <p className="text-gray-600 mb-2 leading-relaxed">
                        {data.regionLocation}
                    </p>

                    {/* 모델 정보 (기계 알람일 때만) */}
                    {!isSafetyAlarm && data.model && (
                        <p className="text-gray-600 mb-4">
                            모델: {data.model}
                        </p>
                    )}

                    {/* 메시지 박스 */}
                    <div
                        className="p-4 rounded-lg mb-6"
                        style={{
                            backgroundColor: isSafetyAlarm
                                ? 'rgba(255, 255, 255, 0.1)'
                                : '#f5f5f5'
                        }}
                    >
                        <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                            {data.message}
                        </p>
                    </div>

                    {/* 확인 버튼 */}
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        확인
                    </button>
                </div>

                {/* X 버튼 */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors duration-200"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <style jsx>{`
                @keyframes slideInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-30px) scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
        </div>
    );
}