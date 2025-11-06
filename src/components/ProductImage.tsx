export default function ProductImage() {
  return (
    <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gray-100">
      <img
        src="/product01.jpeg"
        alt="상품 이미지"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
