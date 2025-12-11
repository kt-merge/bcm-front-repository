"use client";

import type { Product } from "@/types";
import { ProductListItem } from "@/components/mypage/ProductListItem";
import { getStatClass } from "@/lib/utils";

interface SalesHistorySectionProps {
  sellingBidding: Product[];
  sellingPending: Product[];
  sellingCompleted: Product[];
}

export default function SalesHistorySection({
  sellingBidding,
  sellingPending,
  sellingCompleted,
}: SalesHistorySectionProps) {
  const totalCount =
    sellingBidding.length + sellingPending.length + sellingCompleted.length;

  return (
    <section className="mb-10">
      <h2 className="mb-4 text-lg font-semibold">판매 내역</h2>

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
            <p className={getStatClass(sellingBidding.length, false, true)}>
              입찰 중
            </p>
            <p className={getStatClass(sellingBidding.length, false, false)}>
              {sellingBidding.length}
            </p>
          </div>

          {/* 3. 입금 대기 */}
          <div>
            <p className={getStatClass(sellingPending.length, true, true)}>
              입금 대기
            </p>
            <p className={getStatClass(sellingPending.length, true, false)}>
              {sellingPending.length}
            </p>
          </div>

          {/* 4. 판매 완료 */}
          <div>
            <p className={getStatClass(sellingCompleted.length, false, true)}>
              판매 완료
            </p>
            <p className={getStatClass(sellingCompleted.length, false, false)}>
              {sellingCompleted.length}
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
          {sellingBidding.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground text-sm">
                현재 입찰 중인 상품이 없습니다.
              </p>
            </div>
          ) : (
            sellingBidding.map((product) => (
              <ProductListItem
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.bidPrice ?? product.startPrice}
                status={product.productStatus}
                subText={`전체 입찰 횟수: ${product.bidCount}`}
              />
            ))
          )}
        </div>
      </div>

      {/* 입금 대기 목록 */}
      <div className="mb-6">
        <h3
          className={`mb-3 text-sm font-medium ${
            sellingPending.length > 0
              ? "text-primary font-bold"
              : "text-muted-foreground"
          }`}
        >
          입금 대기
        </h3>
        <div
          className={`rounded-lg border ${
            sellingPending.length > 0
              ? "border-primary/20 bg-primary/5"
              : "border-border bg-card"
          }`}
        >
          {sellingPending.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground text-sm">
                결제 확인을 기다리는 상품이 없습니다.
              </p>
            </div>
          ) : (
            sellingPending.map((product) => (
              <ProductListItem
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.bidPrice ?? product.startPrice}
                status={product.productStatus}
                subText="구매자 결제 대기 중"
              />
            ))
          )}
        </div>
      </div>

      {/* 판매 완료 목록 */}
      <div>
        <h3 className="text-muted-foreground mb-3 text-sm font-medium">
          판매 완료
        </h3>
        <div className="border-border bg-card rounded-lg border">
          {sellingCompleted.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground text-sm">
                판매 완료된 상품이 없습니다.
              </p>
            </div>
          ) : (
            sellingCompleted.map((product) => (
              <ProductListItem
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.bidPrice ?? product.startPrice}
                status={product.productStatus}
                badgeText="판매 완료"
                subText="결제 완료됨"
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
