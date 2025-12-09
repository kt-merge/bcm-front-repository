"use client";

import { useState, useEffect } from "react";
import { Product, ProductListResponse } from "@/types";
import mockData from "@/mocks/products.json";

type SortOption =
  | "latest"
  | "price-high"
  | "price-low"
  | "bid-count"
  | "ending-soon";

export function useProducts(searchQuery: string = "", pageSize: number = 6) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // 전체 상품 데이터 가져오기
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products?page=0&size=1000`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products from API");
        }

        const data: ProductListResponse = await res.json();

        if (data.content && data.content.length > 0) {
          setAllProducts(data.content);
        } else {
          setAllProducts(mockData as Product[]);
        }
      } catch (error) {
        console.error("API fetch failed, loading mock data:", error);
        setAllProducts(mockData as Product[]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  // 검색어 변경 시 페이지 리셋
  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery]);

  // 필터링, 정렬, 페이지네이션 적용
  useEffect(() => {
    if (allProducts.length === 0) return;

    // 1. 검색 필터링
    let filtered = allProducts;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = allProducts.filter((product) => {
        const matchName = product.name.toLowerCase().includes(query);
        const matchDescription = product.description
          .toLowerCase()
          .includes(query);
        const matchCategory = product.category.toLowerCase().includes(query);
        return matchName || matchDescription || matchCategory;
      });
    }

    // 2. 정렬 (경매 종료 여부 우선, 그 다음 선택된 정렬 기준)
    const sorted = [...filtered].sort((a, b) => {
      const aExpired = new Date(a.bidEndDate).getTime() < new Date().getTime();
      const bExpired = new Date(b.bidEndDate).getTime() < new Date().getTime();

      if (!aExpired && bExpired) return -1;
      if (aExpired && !bExpired) return 1;

      switch (sortBy) {
        case "latest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "price-high":
          return b.bidPrice - a.bidPrice;
        case "price-low":
          return a.bidPrice - b.bidPrice;
        case "bid-count":
          return b.bidCount - a.bidCount;
        case "ending-soon":
          return (
            new Date(a.bidEndDate).getTime() - new Date(b.bidEndDate).getTime()
          );
        default:
          return 0;
      }
    });

    // 3. 페이지네이션
    const startIdx = currentPage * pageSize;
    const endIdx = startIdx + pageSize;
    setSortedProducts(sorted.slice(startIdx, endIdx));
    setTotalPages(Math.ceil(sorted.length / pageSize));
    setTotalItems(sorted.length);
  }, [allProducts, searchQuery, sortBy, currentPage, pageSize]);

  return {
    products: sortedProducts,
    loading,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
  };
}
