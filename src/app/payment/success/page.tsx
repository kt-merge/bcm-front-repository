"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Download } from "lucide-react";

// 서버사이드에서는 고정값, 클라이언트에서는 동적 생성
const generateOrderNumber = () => {
  if (typeof window === "undefined") {
    return "BCM-2024-XXXXXXXXX";
  }
  return "BCM-" + Math.random().toString(36).substring(2, 11).toUpperCase();
};

export default function SuccessPage() {
  const orderNumber = generateOrderNumber();
  const orderDate = new Date().toLocaleDateString("ko-KR");

  return (
    <main className="bg-background min-h-screen py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="bg-card border-border space-y-8 rounded-lg border p-8 text-center sm:p-12">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-6">
              <Check className="h-12 w-12 text-green-600" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-foreground text-3xl font-bold sm:text-4xl">
              결제가 완료되었습니다!
            </h1>
            <p className="text-muted-foreground">주문해주셔서 감사합니다.</p>
          </div>

          {/* Order Details */}
          <div className="bg-muted space-y-4 rounded-lg p-6 text-left">
            <div className="border-border flex items-center justify-between border-b pb-4">
              <span className="text-muted-foreground">주문번호</span>
              <span className="text-foreground font-semibold">
                {orderNumber}
              </span>
            </div>
            <div className="border-border flex items-center justify-between border-b pb-4">
              <span className="text-muted-foreground">주문일시</span>
              <span className="text-foreground font-semibold">{orderDate}</span>
            </div>
            <div className="border-border flex items-center justify-between border-b pb-4">
              <span className="text-muted-foreground">결제금액</span>
              <span className="text-foreground text-lg font-semibold">
                ₩51,000
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">예상 배송일</span>
              <span className="text-foreground font-semibold">3-5 영업일</span>
            </div>
          </div>

          {/* Info Message */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm text-blue-900">
              배송 정보와 추적 번호는 가입하신 이메일로 발송될 예정입니다.
              스팸함도 확인해주세요.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <Button
              variant="outline"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-transparent"
            >
              <Download className="h-4 w-4" />
              영수증 다운로드
            </Button>
            <Link href="/profile" className="flex-1">
              <Button className="w-full rounded-lg">주문 조회</Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button
                variant="outline"
                className="w-full rounded-lg bg-transparent"
              >
                홈으로
              </Button>
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-card border-border mt-12 space-y-4 rounded-lg border p-6">
          <h3 className="text-foreground font-semibold">다음 단계</h3>
          <ul className="text-muted-foreground space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="text-primary shrink-0 font-semibold">1.</span>
              <span>
                판매자가 상품을 준비 중입니다. 준비 완료 시 이메일 알림을 받을
                수 있습니다.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary shrink-0 font-semibold">2.</span>
              <span>
                상품이 발송되면 배송 추적 번호를 이메일로 받으실 수 있습니다.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary shrink-0 font-semibold">3.</span>
              <span>상품 수령 후 판매자를 평가하고 리뷰를 남겨주세요.</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
