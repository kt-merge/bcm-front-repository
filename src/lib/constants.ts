/**
 * 상품 상태 (ERD: product_status ENUM)
 */
export const PRODUCT_STATUS = [
  { label: "좋음", value: "GOOD" },
  { label: "보통", value: "AVERAGE" },
  { label: "나쁨", value: "BAD" },
];

/**
 * 경매 상태
 */
export const BID_STATUS = [
  { label: "미입찰", value: "NOT_BIDDED" },
  { label: "입찰중", value: "BIDDED" },
  { label: "낙찰완료", value: "PAYMENT_WAITING" },
  { label: "종료", value: "COMPLETED" },
];
