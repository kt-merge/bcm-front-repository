import type { Bid } from "@/types/index";

interface BidHistoryProps {
  history: Bid[];
}

export function BidHistory({ history }: BidHistoryProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-foreground text-2xl font-bold">입찰 기록</h2>
      <div className="max-h-80 space-y-2 overflow-y-auto">
        {history.map((bid, idx) => (
          <div
            key={idx}
            className="bg-muted border-border flex items-center justify-between rounded-lg border p-3 text-sm"
          >
            <div className="flex-1">
              <p className="text-foreground font-semibold">
                ₩{bid.amount.toLocaleString()}
              </p>
              <p className="text-muted-foreground text-xs">{bid.time}</p>
            </div>
            <span className="text-muted-foreground ml-2 text-xs">
              {bid.bidder}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
