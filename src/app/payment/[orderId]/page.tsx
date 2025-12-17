"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/user/useAuth";
import { usePaymentOrder } from "@/hooks/payment/usePaymentOrder";
import { useTossPayments } from "@/hooks/payment/useTossPayments";
import { usePaymentCalculation } from "@/hooks/payment/usePaymentCalculation";
import ShippingForm from "@/components/payment/ShippingForm";
import PaymentWidget from "@/components/payment/PaymentWidget";
import PaymentSummary from "@/components/payment/PaymentSummary";
import OrderSkeleton from "@/components/payment/OrderSkeleton";

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ orderId: string }> | { orderId: string };
}) {
  const { user, isLoading: authLoading } = useAuth();
  const [resolvedOrderId, setResolvedOrderId] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // params 해석
  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await Promise.resolve(params);
      const id = parseInt(resolved.orderId, 10);
      setResolvedOrderId(id);
    };
    resolveParams();
  }, [params]);

  // 주문 데이터 조회
  const {
    orderId,
    winningProduct,
    deliveryInfo,
    isLoading,
    setDeliveryInfo,
    updateShippingInfo,
  } = usePaymentOrder(resolvedOrderId, authLoading, user);

  // 결제 금액 계산
  const { shippingFee, tax, totalAmount } = usePaymentCalculation(
    winningProduct.winningBid,
  );

  // 토스페이먼츠 위젯 관리
  // isLoading이 false이고 orderId가 있을 때만 초기화
  const { widgetReady, requestPayment } = useTossPayments(
    orderId,
    totalAmount,
    !isLoading && orderId > 0,
  );

  // 주소 찾기 완료 핸들러
  const handleAddressComplete = (data: {
    zonecode: string;
    address: string;
  }) => {
    setDeliveryInfo({
      ...deliveryInfo,
      postalCode: data.zonecode,
      address: data.address,
    });
    // 주소 관련 에러 메시지 제거
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.postalCode;
      delete newErrors.address;
      return newErrors;
    });
    setIsOpen(false);
  };

  // 배송 정보 입력 핸들러
  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryInfo({ ...deliveryInfo, [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // 주문 완료 핸들러
  const handleCompleteOrder = async () => {
    // 배송 정보 검증
    const newErrors: Record<string, string> = {};

    if (!deliveryInfo.name.trim()) newErrors.name = "이름을 입력해주세요";
    if (!deliveryInfo.phone.trim()) newErrors.phone = "전화번호를 입력해주세요";
    if (!deliveryInfo.address.trim()) newErrors.address = "주소를 입력해주세요";
    if (!deliveryInfo.detailAddress.trim())
      newErrors.detailAddress = "상세주소를 입력해주세요";
    if (!deliveryInfo.postalCode.trim())
      newErrors.postalCode = "우편번호를 입력해주세요";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsProcessing(true);

    try {
      // 배송 정보 업데이트
      await updateShippingInfo(deliveryInfo);

      // 토스페이먼츠 결제 요청
      await requestPayment({
        orderId: `ORDER_${orderId}_${Date.now()}`,
        orderName: winningProduct.title,
        successUrl: `${window.location.origin}/payment/success?myOrderId=${orderId}&amount=${totalAmount}`,
        failUrl: `${window.location.origin}/payment/fail?myOrderId=${orderId}`,
        customerEmail: "customer@example.com",
        customerName: deliveryInfo.name,
        customerMobilePhone: deliveryInfo.phone.replace(/-/g, ""),
      });
    } catch (error) {
      console.error("주문 처리 실패:", error);
      alert("결제 요청에 실패했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="bg-background min-h-screen py-6 sm:py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-foreground mb-8 text-2xl font-bold sm:mb-10 sm:text-3xl md:mb-12 md:text-4xl">
          주문 결제
        </h1>

        {isLoading ? (
          <OrderSkeleton />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-6 sm:space-y-8 lg:col-span-2">
              <ShippingForm
                deliveryInfo={deliveryInfo}
                errors={errors}
                isOpen={isOpen}
                onAddressComplete={handleAddressComplete}
                onAddressSearchOpen={() => setIsOpen(true)}
                onAddressSearchClose={() => setIsOpen(false)}
                onChange={handleDeliveryChange}
              />

              <PaymentWidget
                widgetReady={widgetReady}
                isProcessing={isProcessing}
                onPayment={handleCompleteOrder}
              />
            </div>

            {/* Order Summary Sidebar */}
            <PaymentSummary
              winningProduct={winningProduct}
              shippingFee={shippingFee}
              tax={tax}
              totalAmount={totalAmount}
            />
          </div>
        )}
      </div>
    </main>
  );
}
