"use client";

import type { MypageProductBid, Order } from "@/types";
import { Button } from "@/components/ui/button";
import { ProductListItem } from "@/components/mypage/ProductListItem";
import { getStatClass } from "@/lib/utils";

interface PurchaseHistorySectionProps {
  purchaseBidding: MypageProductBid[];
  paymentPendingOrders: Order[];
  completedOrders: Order[];
  onPayment: (orderId: number | string, productName: string) => void;
}

export default function PurchaseHistorySection({
  purchaseBidding,
  paymentPendingOrders,
  completedOrders,
  onPayment,
}: PurchaseHistorySectionProps) {
  const totalCount =
    purchaseBidding.length +
    paymentPendingOrders.length +
    completedOrders.length;

  return (
    <section className="mb-10">
      <h2 className="mb-4 text-lg font-semibold">구매 내역</h2>

      {/* 요약 바 */}
      <div className="border-border bg-card mb-6 rounded-lg border p-4">
        <div className="grid grid-cols-4 text-center text-sm">
          {/* 1. 전체 */}
          <div className="border-border border-r">
            <p className={getStatClass(totalCount, false, true)}>전체</p>
            <p className={getStatClass(totalCount, false, false)}>
              {totalCount}
            </p>
          </div>

          {/* 2. 입찰 중 */}
          <div>
            <p className={getStatClass(purchaseBidding.length, false, true)}>
              입찰 중
            </p>
            <p className={getStatClass(purchaseBidding.length, false, false)}>
              {purchaseBidding.length}
            </p>
          </div>

          {/* 3. 결제 대기 */}
          <div>
            <p
              className={getStatClass(paymentPendingOrders.length, true, true)}
            >
              결제 대기
            </p>
            <p
              className={getStatClass(paymentPendingOrders.length, true, false)}
            >
              {paymentPendingOrders.length}
            </p>
          </div>

          {/* 4. 구매 완료 */}
          <div>
            <p className={getStatClass(completedOrders.length, false, true)}>
              구매 완료
            </p>
            <p className={getStatClass(completedOrders.length, false, false)}>
              {completedOrders.length}
            </p>
          </div>
        </div>
      </div>

      {/* 입찰 중 목록 */}
      <div className="mb-6">
        <h3 className="text-muted-foreground mb-3 text-sm font-medium">
          입찰 중
        </h3>
        <div className="border-border bg-card rounded-lg border">
          {purchaseBidding.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground text-sm">
                현재 입찰 중인 상품이 없습니다.
              </p>
            </div>
          ) : (
            purchaseBidding.map((product) => (
              <ProductListItem
                key={product.productId}
                id={product.productId}
                name={product.productName}
                price={product.price}
                subText={`내 입찰 횟수: ${product.bidCount}`}
              />
            ))
          )}
        </div>
      </div>

      {/* 결제 대기 목록 */}
      <div className="mb-8">
        <h3
          className={`mb-3 text-sm font-medium ${
            paymentPendingOrders.length > 0
              ? "text-primary"
              : "text-muted-foreground"
          }`}
        >
          결제 대기
        </h3>
        <div
          className={`rounded-lg border ${
            paymentPendingOrders.length > 0
              ? "border-primary/20 bg-primary/5"
              : "border-border bg-card"
          }`}
        >
          {paymentPendingOrders.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground text-sm">
                결제 대기 중인 상품이 없습니다.
              </p>
            </div>
          ) : (
            paymentPendingOrders.map((order) => (
              <ProductListItem
                key={order.orderId}
                id={order.orderId}
                name={order.productName}
                price={order.bidPrice}
                subText="낙찰 성공! 결제가 필요합니다."
                actionNode={
                  <Button
                    size="sm"
                    onClick={() => onPayment(order.orderId, order.productName)}
                  >
                    결제하기
                  </Button>
                }
              />
            ))
          )}
        </div>
      </div>

      {/* 구매 완료 목록 */}
      <div>
        <h3 className="text-muted-foreground mb-3 text-sm font-medium">
          구매 완료
        </h3>
        <div className="border-border bg-card rounded-lg border">
          {completedOrders.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground text-sm">
                구매 완료된 상품이 없습니다.
              </p>
            </div>
          ) : (
            completedOrders.map((order) => (
              <ProductListItem
                key={order.orderId}
                id={order.orderId}
                name={order.productName}
                price={order.bidPrice}
                status={order.orderStatus}
                badgeText="구매 완료"
                subText="배송 준비중"
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
