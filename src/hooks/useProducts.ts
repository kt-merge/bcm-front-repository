"use client";

import { useState, useEffect } from "react";
import { Product, ProductListResponse } from "@/types";
import { apiGet } from "@/lib/api";
import mockData from "@/mocks/products.json";

type SortOption =
  | "latest"
  | "price-high"
  | "price-low"
  | "bid-count"
  | "ending-soon";

// 정렬 옵션을 서버 정렬 쿼리로 매핑
// Record 타입 사용으로 모든 SortOption에 대한 매핑을 강제하여 타입 안정성 확보
const SORT_MAP: Record<SortOption, string> = {
  latest: "createdAt,desc",
  "ending-soon": "bidEndDate,asc",
  "price-high": "bidPrice,desc",
  "price-low": "bidPrice,asc",
  "bid-count": "bidCount,desc",
};

export function useProducts(
  searchQuery: string = "",
  pageSize: number = 6,
  initialPage: number = 0,
) {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    initialPage >= 0 ? initialPage : -1,
  );
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // 검색어 변경 시 페이지 리셋
  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery]);

  // 서버 페이지네이션 기반으로 데이터 가져오기
  useEffect(() => {
    // 유효한 페이지 번호가 설정될 때까지 요청 보류
    if (currentPage < 0) return;

    let ignore = false;
    const fetchPage = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        // condition
        if (searchQuery.trim()) params.set("name", searchQuery.trim());
        // pageable
        params.set("page", String(currentPage));
        params.set("size", String(pageSize));
        params.set("sort", SORT_MAP[sortBy]);

        const data = await apiGet<ProductListResponse>(
          `/api/products?${params.toString()}`,
        );

        if (ignore) return;
        setProducts(data.content ?? []);
        setTotalPages(data.totalPages ?? 0);
        setTotalItems(data.totalElements ?? 0);
      } catch (error) {
        console.error("제품 목록 조회 실패, 목데이터 사용:", error);
        // API 실패 시 목데이터 기준으로 페이징
        const all = (mockData as Product[]) ?? [];
        const startIdx = currentPage * pageSize;
        const endIdx = startIdx + pageSize;
        setProducts(all.slice(startIdx, endIdx));
        setTotalPages(Math.ceil(all.length / pageSize));
        setTotalItems(all.length);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchPage();
    return () => {
      ignore = true;
    };
  }, [searchQuery, sortBy, currentPage, pageSize]);

  return {
    products,
    loading,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
  };
}
