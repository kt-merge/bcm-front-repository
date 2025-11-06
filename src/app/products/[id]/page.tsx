import BidHistoryList from "@/components/BidHistoryList";
import ProductBidPanel from "@/components/ProductBidPanel";
import ProductDescription from "@/components/ProductDescription";
import ProductImage from "@/components/ProductImage";
import ProductInfo from "@/components/ProductInfo";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="bg-background min-h-screen py-8 md:py-12">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        <ProductImage />

        <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <ProductInfo />
            <ProductDescription />
          </div>
          <ProductBidPanel />
        </div>

        <BidHistoryList />
      </div>
    </main>
  );
}
