'use client';

// src/components/common/NotificationModal.tsx
import React, { useEffect, useCallback, useMemo } from 'react';
import { AlarmData } from '@/constants/websocket/client';

interface NotificationModalProps {
    isVisible: boolean;
    data: AlarmData | null;
    onClose: () => void;
}

export default function NotificationModal({ isVisible, data, onClose }: NotificationModalProps) {
    // 모달 상태 변화 로깅 (모바일과 동일)
    useEffect(() => {
        console.log('🎭 웹 모달 상태 변화:', {
            visible: isVisible,
            hasData: !!data,
            alarmId: data?.alarmId,
            type: data?.type,
            isSafety: data?.type === 'safety'
        });
    }, [isVisible, data]);

    // ESC 키 및 브라우저 뒤로가기 처리 (모바일의 Android 뒤로가기와 동일한 역할)
    useEffect(() => {
        if (!isVisible) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                console.log('🎭 ESC 키 - 웹 모달 닫기');
                onClose();
            }
        };

        const handlePopState = () => {
            console.log('🎭 브라우저 뒤로가기 - 웹 모달 닫기');
            onClose();
        };

        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('popstate', handlePopState);
        document.body.style.overflow = 'hidden'; // 스크롤 방지

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('popstate', handlePopState);
            document.body.style.overflow = 'unset';
        };
    }, [isVisible, onClose]);

    /**
     * 상단 타이틀 계산 (모바일과 동일한 로직)
     */
    const displayTitle = useMemo(() => {
        if (!data) return '';
        if (data.type === 'safety') return '🚨 안전 사고 발생';

        const STATUS_LABELS: Record<string, string> = {
            danger: '위험',
            warning: '점검 요망',
            normal: '정상',
            repair: '점검 중',
            offline: '마이크 미연결',
        };
        return STATUS_LABELS[data.status] || '알 수 없음';
    }, [data?.type, data?.status]);

    // 모달 닫기 핸들러 (사용자 액션에 의해서만)
    const handleHideModal = useCallback(() => {
        console.log('🎭 사용자 액션으로 웹 모달 닫기');
        onClose();
    }, [onClose]);

    // 백드롭 클릭 시 모달 닫기
    const handleBackdropClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleHideModal();
        }
    }, [handleHideModal]);

    // 시간 포맷팅 함수
    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).format(date);
    };

    // 모달이 보이지 않거나 데이터가 없으면 렌더링하지 않음
    if (!isVisible || !data) {
        console.log('🎭 웹 모달 렌더링 스킵:', { visible: isVisible, hasData: !!data });
        return null;
    }

    console.log('🎭 웹 모달 렌더링 시작:', {
        visible: isVisible,
        regionName: data.regionName,
        status: data.status,
        type: data.type,
        isSafety: data.type === 'safety'
    });

    // 상태/타입별 색상 및 라벨 매핑 (모바일과 동일)
    const STATUS_COLORS: Record<string, string> = {
        danger: '#FF2F16',
        warning: '#FFC525',
        normal: '#1CAA00',
        repair: '#898989',
        offline: '#515151',
    };

    const STATUS_LABELS: Record<string, string> = {
        danger: '위험',
        warning: '점검 요망',
        normal: '정상',
        repair: '점검 중',
        offline: '마이크 미연결',
    };

    const ALARM_LABELS: Record<string, string> = {
        machine: '장비 알람',
        safety: '🚨 비상 알람',
    };

    // 현재 알람에 맞는 표현 값들
    const topColor = STATUS_COLORS[data.status] || '#898989';
    const statusLabel = STATUS_LABELS[data.status] || '알 수 없음';
    const alarmType = ALARM_LABELS[data.type] || '기타 알람';

    // safety 타입일 때 본문 배경 강조 (모바일과 동일)
    const isSafetyAlarm = data.type === 'safety';
    const bodyBackgroundColor = isSafetyAlarm ? '#FFEBEB' : '#FFFFFF';
    const modalBorderColor = isSafetyAlarm ? topColor : 'transparent';

    return (
        <>
            {/* 백드롭 */}
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 z-50 ${isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
                    }`}
                onClick={handleBackdropClick}
            />

            {/* 모달 컨테이너 */}
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                <div
                    className={`modal-container bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 pointer-events-auto transform transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        } ${isSafetyAlarm ? 'safety-pulse' : ''}`}
                    style={{
                        backgroundColor: bodyBackgroundColor,
                        border: isSafetyAlarm ? `3px solid ${modalBorderColor}` : 'none'
                    }}
                >
                    {/* 모달 헤더 */}
                    <div
                        className="px-6 py-4 rounded-t-2xl"
                        style={{ backgroundColor: topColor }}
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">
                                {alarmType}
                            </h2>
                            <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-white text-sm font-medium">
                                {displayTitle}
                            </span>
                        </div>
                    </div>

                    {/* 모달 바디 */}
                    <div className="px-6 py-4">
                        {/* 지역/위치 정보 */}
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                {data.regionName}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {data.regionLocation}
                            </p>
                        </div>

                        {/* 상태 정보 */}
                        <div className="mb-4 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">상태</span>
                                <span
                                    className="text-sm font-bold px-2 py-1 rounded text-white"
                                    style={{ backgroundColor: topColor }}
                                >
                                    {statusLabel}
                                </span>
                            </div>

                            {/* 장비 알람일 때만 모델 정보 표시 */}
                            {!isSafetyAlarm && data.model && (
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">장비 모델</span>
                                    <span className="text-sm text-gray-600">{data.model}</span>
                                </div>
                            )}
                        </div>

                        {/* 메시지 */}
                        {data.message && (
                            <div className={`mb-4 p-3 rounded-lg ${isSafetyAlarm
                                ? 'bg-red-100 border-l-4 border-red-500'
                                : 'bg-blue-50 border-l-4 border-blue-400'
                                }`}>
                                <p className={`text-sm leading-relaxed ${isSafetyAlarm ? 'text-red-800 font-semibold' : 'text-gray-800'
                                    }`}>
                                    {data.message}
                                </p>
                            </div>
                        )}

                        {/* 시간 정보 */}
                        <div className="text-xs text-gray-500 mb-4">
                            발생 시간: {formatTime(data.createdAt)}
                        </div>
                    </div>

                    {/* 모달 푸터 */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
                        <div className="flex gap-3">
                            <button
                                onClick={handleHideModal}
                                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                            >
                                확인
                            </button>

                            {isSafetyAlarm && (
                                <button
                                    onClick={() => {
                                        console.log('🚨 비상 알람 - 긴급 조치 필요');
                                        // TODO: 비상 알람 상세 처리 로직
                                        // 예: 119 호출, 관리자 알림, 대피 안내 등
                                        handleHideModal();
                                    }}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                                >
                                    긴급 조치
                                </button>
                            )}
                        </div>
                    </div>

                    {/* 안전 알람 시 추가 시각적 강조 */}
                    {isSafetyAlarm && (
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                            <div
                                className="w-full h-full animate-pulse border-4 rounded-2xl"
                                style={{
                                    borderColor: topColor,
                                    opacity: 0.5
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* 커스텀 CSS 애니메이션 */}
            <style jsx>{`
                @keyframes modalFadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9) translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }

                @keyframes pulse {
                    0%, 100% { 
                        opacity: 0.3; 
                        transform: scale(1);
                    }
                    50% { 
                        opacity: 0.7; 
                        transform: scale(1.02);
                    }
                }

                .modal-container {
                    animation: modalFadeIn 0.3s ease-out;
                }

                .safety-pulse {
                    animation: pulse 2s infinite;
                }
            `}</style>
        </>
    );
}