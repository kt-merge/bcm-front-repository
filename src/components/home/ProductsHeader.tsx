type SortOption =
  | "latest"
  | "price-high"
  | "price-low"
  | "bid-count"
  | "ending-soon";

interface ProductsHeaderProps {
  searchQuery: string;
  totalItems: number;
  displayedCount: number;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function ProductsHeader({
  searchQuery,
  totalItems,
  displayedCount,
  sortBy,
  onSortChange,
}: ProductsHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-bold sm:text-base">
          {searchQuery ? `"${searchQuery}" 검색 결과` : "Hot Items🔥"}
        </p>
        <p className="text-muted-foreground text-xs sm:text-sm">
          {searchQuery
            ? `총 ${totalItems}개 중 ${displayedCount}개 표시`
            : `Showing ${displayedCount} items`}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="border-input bg-background ring-offset-background focus:ring-ring w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none sm:w-auto"
        >
          <option value="latest">최신순</option>
          <option value="ending-soon">마감임박순</option>
          <option value="price-high">높은 가격순</option>
          <option value="price-low">낮은 가격순</option>
          <option value="bid-count">입찰 많은순</option>
        </select>
      </div>
    </div>
  );
}
