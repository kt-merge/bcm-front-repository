interface ProductDescriptionProps {
  description: string;
}

export function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <div className="space-y-4 lg:col-span-2">
      <h2 className="text-foreground text-2xl font-bold">상세 설명</h2>
      <p className="text-foreground leading-relaxed">{description}</p>
    </div>
  );
}
