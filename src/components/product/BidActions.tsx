"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BidActionsProps {
  minBid: number;
  bidAmount: string;
  setBidAmount: (value: string) => void;
  showBidForm: boolean;
  setShowBidForm: (value: boolean) => void;
  isWatchlisted: boolean;
  setIsWatchlisted: (value: boolean) => void;
  handlePlaceBid: () => void;
}

export function BidActions({
  minBid,
  bidAmount,
  setBidAmount,
  showBidForm,
  setShowBidForm,
  isWatchlisted,
  setIsWatchlisted,
  handlePlaceBid,
}: BidActionsProps) {
  return (
    <>
      {!showBidForm ? (
        <div className="space-y-3">
          <Button
            onClick={() => setShowBidForm(true)}
            size="lg"
            className="w-full rounded-lg"
          >
            입찰하기
          </Button>
          <Button
            onClick={() => setIsWatchlisted(!isWatchlisted)}
            variant="outline"
            size="lg"
            className="w-full rounded-lg"
          >
            <Heart
              className={`mr-2 h-4 w-4 ${
                isWatchlisted ? "fill-red-500 text-red-500" : "" // 하트 채우기 효과 수정
              }`}
            />
            {isWatchlisted ? "관심상품 등록됨" : "관심상품 등록"}
          </Button>
        </div>
      ) : (
        <div className="border-border bg-card space-y-4 rounded-lg border p-4">
          <div>
            <label className="text-foreground text-sm font-medium">
              입찰가
            </label>
            <p className="text-muted-foreground mt-1 text-xs">
              최소: ₩{minBid.toLocaleString()}
            </p>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="bg-background border-border text-foreground focus:ring-primary placeholder:text-muted-foreground mt-2 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:outline-none"
              min={minBid}
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handlePlaceBid}
              size="sm"
              className="flex-1 rounded-lg"
            >
              입찰 확정
            </Button>
            <Button
              onClick={() => setShowBidForm(false)}
              variant="outline"
              size="sm"
              className="flex-1 rounded-lg"
            >
              취소
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
