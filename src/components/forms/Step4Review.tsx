interface Step4ReviewProps {
  formData: {
    title: string;
    category: string;
    condition: string;
    description: string;
    startingPrice: string;
    duration: string;
  };
  uploadedImages: string[];
}

export default function Step4Review({
  formData,
  uploadedImages,
}: Step4ReviewProps) {
  const durations = [
    { label: "3일", value: "3" },
    { label: "7일", value: "7" },
    { label: "14일", value: "14" },
    { label: "30일", value: "30" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground mb-2 text-2xl font-bold">
          등록 내용 확인
        </h2>
        <p className="text-muted-foreground">
          등록하기 전에 내용을 확인해주세요
        </p>
      </div>

      <div className="space-y-6">
        {uploadedImages.length > 0 && (
          <div>
            <h3 className="text-foreground mb-3 font-semibold">사진</h3>
            <div className="grid grid-cols-3 gap-3">
              {uploadedImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img || "/placeholder.svg"}
                  alt={`미리보기 ${idx + 1}`}
                  className="border-border h-32 w-full rounded-lg border object-cover"
                />
              ))}
            </div>
          </div>
        )}

        <div className="border-border space-y-4 border-t pt-6">
          <div>
            <p className="text-muted-foreground text-xs">상품명</p>
            <p className="text-foreground font-semibold">
              {formData.title || "입력되지 않음"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground text-xs">카테고리</p>
              <p className="text-foreground font-semibold capitalize">
                {formData.category}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">상태</p>
              <p className="text-foreground font-semibold capitalize">
                {formData.condition}
              </p>
            </div>
          </div>

          {formData.description && (
            <div>
              <p className="text-muted-foreground text-xs">상세 설명</p>
              <p className="text-foreground text-sm">{formData.description}</p>
            </div>
          )}

          <div className="border-border grid grid-cols-2 gap-4 border-t pt-4">
            <div>
              <p className="text-muted-foreground text-xs">시작 가격</p>
              <p className="text-foreground font-semibold">
                ₩{formData.startingPrice || "0"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">경매 기간</p>
              <p className="text-foreground font-semibold">
                {durations.find((d) => d.value === formData.duration)?.label}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 border-border text-muted-foreground rounded-lg border p-4 text-xs">
          <p>
            등록 버튼을 클릭하면 이용약관에 동의하며, 상품이 진품이고 정확하게
            설명되었음을 확인하는 것입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
