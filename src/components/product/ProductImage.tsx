interface ProductImageProps {
  image: string;
  title: string;
}

export function ProductImage({ image, title }: ProductImageProps) {
  return (
    <div className="bg-muted border-border flex aspect-square items-center justify-center overflow-hidden rounded-xl border shadow-sm">
      <img
        src={image || "/placeholder.svg"}
        alt={title}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
