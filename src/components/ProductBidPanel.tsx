"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProductBidPanel() {
  const [bid, setBid] = useState("");

  const handleBid = () => {
    console.log("입찰가:", bid);
  };

  return (
    <aside className="space-y-4 rounded-2xl bg-white p-6 shadow-md">
      <h2 className="mb-2 text-xl font-semibold">입찰하기</h2>
      <Input
        type="number"
        placeholder="입찰가 입력"
        value={bid}
        onChange={(e) => setBid(e.target.value)}
      />
      <Button onClick={handleBid} className="w-full">
        입찰 등록
      </Button>

      <Button variant="outline" className="w-full">
        관심상품 등록
      </Button>
    </aside>
  );
}
