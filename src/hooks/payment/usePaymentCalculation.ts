import { useMemo } from "react";

export const PAYMENT_CONSTANTS = {
  SHIPPING_FEE: 3000,
  TAX_RATE: 0.1, // 10%
};

interface UsePaymentCalculationReturn {
  shippingFee: number;
  tax: number;
  totalAmount: number;
}

/**
 * 결제 금액 계산을 담당하는 훅
 * - 배송료, 세금, 총액 계산
 * - 메모이제이션을 통한 성능 최적화
 */
export function usePaymentCalculation(
  winningBid: number,
): UsePaymentCalculationReturn {
  const calculation = useMemo(() => {
    const shippingFee = PAYMENT_CONSTANTS.SHIPPING_FEE;
    const tax = Math.floor(winningBid * PAYMENT_CONSTANTS.TAX_RATE);
    const totalAmount = winningBid + shippingFee + tax;

    return {
      shippingFee,
      tax,
      totalAmount,
    };
  }, [winningBid]);

  return calculation;
}
