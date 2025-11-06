import { Badge } from "@/components/ui/badge";

export default function ProductInfo() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          아이폰17 프로 맥스 256GB (미개봉)
        </h1>
        <Badge variant="secondary">진행 중</Badge>
      </div>

      <div className="text-gray-600">판매자: 익명#1234</div>

      <div className="space-y-1">
        <p>
          현재 입찰가: <span className="text-lg font-semibold">₩1,500,000</span>
        </p>
        <p>
          즉시 구매가:{" "}
          <span className="text-gray-500 line-through">₩1,970,000</span>
        </p>
        <p>
          남은 시간:{" "}
          <span className="font-medium text-orange-500">00:12:43</span>
        </p>
      </div>
    </section>
  );
}
