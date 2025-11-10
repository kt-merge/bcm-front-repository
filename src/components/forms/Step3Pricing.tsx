import { Input } from "@/components/ui/input";

interface Step3PricingProps {
  formData: {
    title: string;
    category: string;
    condition: string;
    description: string;
    startingPrice: string;
    duration: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      category: string;
      condition: string;
      description: string;
      startingPrice: string;
      duration: string;
    }>
  >;
}

export default function Step3Pricing({
  formData,
  setFormData,
}: Step3PricingProps) {
  const durations = [
    { label: "3일", value: "3" },
    { label: "7일", value: "7" },
    { label: "14일", value: "14" },
    { label: "30일", value: "30" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground mb-2 text-2xl font-bold">가격 설정</h2>
        <p className="text-muted-foreground">
          시작 가격과 경매 기간을 설정해주세요
        </p>
      </div>

      <div className="space-y-6">
        {/* Starting Price */}
        <div>
          <label className="text-foreground mb-2 block text-sm font-medium">
            시작 가격 *
          </label>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-lg font-semibold">
              ₩
            </span>
            <Input
              type="number"
              name="startingPrice"
              placeholder="0"
              value={formData.startingPrice}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  startingPrice: e.target.value,
                }))
              }
              className="flex-1"
              step="1000"
              min="0"
            />
          </div>
          <p className="text-muted-foreground mt-2 text-xs">
            유사 상품 기준 50,000원 ~ 200,000원을 권장합니다
          </p>
        </div>

        {/* Duration */}
        <div>
          <label className="text-foreground mb-3 block text-sm font-medium">
            경매 기간
          </label>
          <div className="grid grid-cols-2 gap-3">
            {durations.map((dur) => (
              <button
                key={dur.value}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, duration: dur.value }))
                }
                className={`rounded-lg border-2 p-3 font-medium transition-all ${
                  formData.duration === dur.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-muted-foreground"
                }`}
              >
                {dur.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
