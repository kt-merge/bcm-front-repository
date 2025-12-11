import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 숫자를 한국 원화 형식으로 포맷팅합니다.
 * @param amount - 포맷팅할 금액 (숫자)
 * @returns 포맷팅된 원화 문자열 (예: "₩12,000")
 */
export function formatCurrency(amount: number): string {
  return `₩${amount.toLocaleString("ko-KR")}`;
}

/**
 * 경매 마감 여부를 확인합니다 (초 단위까지 비교).
 * @param bidEndDate - 경매 종료 날짜 (ISO 8601 문자열 또는 Date 객체)
 * @returns 경매가 종료되었으면 true, 아니면 false
 */
export function isAuctionExpired(bidEndDate: string | Date): boolean {
  const now = new Date().getTime();
  const endDate = new Date(bidEndDate).getTime();
  return now >= endDate;
}

/**
 * 현재 시간과 경매 종료 시간의 차이(밀리초)를 계산합니다.
 * @param bidEndDate - 경매 종료 날짜 (ISO 8601 문자열 또는 Date 객체)
 * @returns 시간 차이 (밀리초). 음수면 경매 종료됨
 */
export function getTimeRemainMs(bidEndDate: string | Date): number {
  const now = new Date().getTime();
  const endDate = new Date(bidEndDate).getTime();
  return endDate - now;
}

/**
 * UTC 시간을 한국 시간(KST)으로 포맷팅합니다.
 * @param dateString - ISO 8601 형식의 UTC 시간 문자열
 * @returns 한국 시간으로 포맷팅된 날짜 문자열 (예: "2025. 11. 27. 오후 3:30:45")
 */
export function formatKoreanTime(dateString: string | Date): string {
  try {
    const date = new Date(dateString);
    // UTC 시간을 한국 시간(UTC+9)으로 변환
    const koreaTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    return koreaTime.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  } catch {
    return "시간 정보 오류";
  }
}

/**
 * 가입 날짜를 "YYYY년 M월 가입" 형식으로 포맷팅합니다.
 * @param isoString - ISO 8601 형식의 날짜 문자열
 * @returns 포맷팅된 가입 날짜 문자열 (예: "2025년 12월 가입")
 */
export function formatJoinDate(isoString: string): string {
  const date = new Date(isoString);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 가입`;
}

/**
 * 마이페이지 통계 섹션에서 수치에 따라 Tailwind CSS 클래스를 동적으로 생성합니다.
 * @param count - 통계 수치
 * @param isPrimary - true면 주색상(primary), false면 기본색상(foreground) 사용
 * @param isTitle - true면 제목 스타일, false면 본문 스타일 적용
 * @returns 적용할 Tailwind CSS 클래스 문자열
 */
export function getStatClass(
  count: number,
  isPrimary?: boolean,
  isTitle?: boolean,
): string {
  const isBold = count > 0;

  if (isTitle) {
    if (isBold) {
      return isPrimary ? "text-primary font-bold" : "text-foreground font-bold";
    } else {
      return "text-muted-foreground";
    }
  }

  if (isBold) {
    return isPrimary
      ? "text-primary mt-1 text-xl font-bold"
      : "text-foreground mt-1 text-xl font-semibold";
  } else {
    return "text-muted-foreground mt-1 text-xl font-semibold";
  }
}

/**
 * JWT 토큰의 payload를 디코딩합니다.
 * @param token - JWT 액세스 토큰
 * @returns 디코딩된 payload 객체 또는 null
 */
export function decodeJWT<T = Record<string, unknown>>(
  token: string,
): T | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];
    // Base64 URL 디코딩 (- 를 +로, _ 를 /로 변환)
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");

    // atob로 Base64 디코딩 후 UTF-8로 변환 (한글 지원)
    const decoded = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );

    return JSON.parse(decoded) as T;
  } catch (error) {
    console.error("JWT 디코딩 실패:", error);
    return null;
  }
}
