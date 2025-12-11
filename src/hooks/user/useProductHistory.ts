import { useState, useEffect, useMemo } from "react";
import type { MypageProductBid, Order, Product, WinnerDetails } from "@/types";
import { apiGet } from "@/lib/api";

type ApiUserResponse = {
  products?: Product[];
  productBids?: MypageProductBid[];
  orders: Order[];
  winners?: WinnerDetails[];
};

export function useProductHistory() {
  const [sellingProducts, setSellingProducts] = useState<Product[]>([]);
  const [purchaseBidding, setPurchaseBidding] = useState<MypageProductBid[]>(
    [],
  );
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 제품 데이터 로드
  const fetchProductHistory = async () => {
    try {
      setError(null);
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setIsLoading(false);
        return;
      }

      const apiUser = await apiGet<ApiUserResponse>("/api/users/me");

      setSellingProducts(apiUser.products ?? []);
      setPurchaseBidding(apiUser.productBids ?? []);
      setOrders(apiUser.orders ?? []);
    } catch (e) {
      console.error("Failed to fetch product history:", e);
      setError("상품 내역을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 로드
  useEffect(() => {
    fetchProductHistory();
  }, []);

  // 판매 상품 필터링
  const {
    bidding: sellingBidding,
    pending: sellingPending,
    completed: sellingCompleted,
  } = useMemo(() => {
    const bidding = sellingProducts.filter((p) => p.bidStatus !== "COMPLETED");
    const pending = sellingProducts.filter((p) => p.bidStatus === "COMPLETED");
    const completed: Product[] = [];

    return {
      bidding,
      pending,
      completed,
    };
  }, [sellingProducts]);

  // 구매 주문 필터링
  const paymentPendingOrders = useMemo(
    () => orders.filter((order) => order.orderStatus === "PAYMENT_PENDING"),
    [orders],
  );

  const completedOrders = useMemo(
    () => orders.filter((order) => order.orderStatus === "PAID"),
    [orders],
  );

  return {
    // 판매 관련
    sellingProducts,
    sellingBidding,
    sellingPending,
    sellingCompleted,

    // 구매 관련
    purchaseBidding,
    orders,
    paymentPendingOrders,
    completedOrders,

    // 상태
    isLoading,
    error,
    refetch: fetchProductHistory,
  };
}
