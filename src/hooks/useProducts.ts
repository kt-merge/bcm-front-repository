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

export function useProducts(searchQuery: string = "", pageSize: number = 6) {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // 검색어 변경 시 페이지 리셋
  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery]);

  // 정렬 옵션을 서버 정렬 쿼리로 매핑
  const toServerSort = (option: SortOption): string => {
    switch (option) {
      case "latest":
        return "createdAt,desc";
      case "ending-soon":
        return "bidEndDate,asc";
      case "price-high":
        return "bidPrice,desc";
      case "price-low":
        return "bidPrice,asc";
      case "bid-count":
        return "bidCount,desc";
      default:
        return "createdAt,desc";
    }
  };

  // 서버 페이지네이션 기반으로 데이터 가져오기
  useEffect(() => {
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
        params.set("sort", toServerSort(sortBy));

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
