import { Badge } from "@/components/ui/badge";

interface ProductInfoProps {
  title: string;
  seller: string;
  condition: string;
  currentBid: number;
  bids: number;
  timeLeft: string;
  category: string;
  minBid: number;
}

export function ProductInfo({
  title,
  seller,
  condition,
  currentBid,
  bids,
  timeLeft,
  category,
  minBid,
}: ProductInfoProps) {
  return (
    <>
      <div className="border-border space-y-3 border-b pb-6">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h1 className="text-foreground text-2xl font-bold text-balance md:text-xl">
              {title}
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">{seller}</p>
          </div>
        </div>
        <Badge variant="outline" className="w-fit">
          {condition}
        </Badge>
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
          현재 입찰가
        </p>
        <p className="text-foreground text-4xl font-bold">
          ₩{currentBid.toLocaleString()}
        </p>
        <p className="text-muted-foreground text-sm">
          {bids}개 입찰 • 남은 시간 {timeLeft}
        </p>
      </div>

      <div className="border-border space-y-3 border-y py-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">카테고리</span>
          <span className="text-foreground font-medium">{category}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">최소 입찰가</span>
          <span className="text-foreground font-medium">
            ₩{minBid.toLocaleString()}
          </span>
        </div>
      </div>
    </>
  );
}
