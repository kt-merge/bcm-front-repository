"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import HeroSection from "@/components/home/HeroSection";
import ProductsHeader from "@/components/home/ProductsHeader";
import ProductsGrid from "@/components/home/ProductsGrid";
import Pagination from "@/components/home/Pagination";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";

function HomeContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const {
    products,
    loading,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
  } = useProducts(searchQuery, 6);

  return (
    <main className="bg-background min-h-screen">
      <HeroSection />

      <section className="py-8 sm:py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProductsHeader
            searchQuery={searchQuery}
            totalItems={totalItems}
            displayedCount={products.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <ProductsGrid
            products={products}
            loading={loading}
            searchQuery={searchQuery}
            currentPage={currentPage}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>
    </main>
  );
}

function LoadingFallback() {
  return (
    <main className="bg-background min-h-screen">
      <HeroSection />
      <section className="py-8 sm:py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HomeContent />
    </Suspense>
  );
}
