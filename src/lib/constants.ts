/**
 * 상품 상태 (ERD: product_status ENUM)
 */
export const PRODUCT_STATUS = [
  { label: "미개봉", value: "UNOPENED" },
  { label: "좋음", value: "GOOD" },
  { label: "보통", value: "AVERAGE" },
  { label: "나쁨", value: "BAD" },
];

export type ProductStatus = (typeof PRODUCT_STATUS)[number]["value"];

/**
 * 주문 상태 (ERD: order_status ENUM)
 */
export const ORDER_STATUS = [
  { label: "결제 대기", value: "PAYMENT_PENDING" },
  { label: "결제 완료", value: "PAID" },
  { label: "기간 만료", value: "EXPIRED" },
  { label: "취소됨", value: "CANCELLED" },
] as const;

export type OrderStatus = (typeof ORDER_STATUS)[number]["value"];

/**
 * 경매 상태
 */
export const BID_STATUS = [
  { label: "미입찰", value: "NOT_BIDDED" },
  { label: "입찰중", value: "BIDDED" },
  { label: "낙찰완료", value: "PAYMENT_WAITING" },
  { label: "종료", value: "COMPLETED" },
] as const;

export type BidStatus = (typeof BID_STATUS)[number]["value"];

/**
 * WebSocket 연결 설정
 */
export const WEBSOCKET_CONFIG = {
  RECONNECT_DELAY: 5000, // 5초 - 재연결 대기 시간 (밀리초)
  HEARTBEAT_INCOMING: 4000, // 4초 - 수신 하트비트 간격 (밀리초)
  HEARTBEAT_OUTGOING: 4000, // 4초 - 송신 하트비트 간격 (밀리초)
} as const;

/**
 * 입찰 금액 제한
 */
export const BID_AMOUNT_LIMITS = {
  MAX_DIGITS: 16, // 최대 자릿수
  MAX_AMOUNT: 10000000000000000, // 1경 (10,000,000,000,000,000)
} as const;

/**
 * 시간 변환 상수 (밀리초)
 */
export const TIME_CONSTANTS = {
  MILLISECONDS_PER_SECOND: 1000,
  SECONDS_PER_MINUTE: 60,
  MINUTES_PER_HOUR: 60,
  HOURS_PER_DAY: 24,
} as const;

/**
 * API 기본 URL
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
