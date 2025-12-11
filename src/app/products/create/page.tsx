"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2 } from "lucide-react";
import { useCreateProductForm } from "@/hooks/useCreateProductForm";
import { PRODUCT_CATEGORIES, PRODUCT_STATUS } from "@/lib/constants";
import { useEffect } from "react";
import Image from "next/image";

// 랜덤 6글자 (영문 대/소문자 + 숫자)
const generateRandomId = (length = 6) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const idx = Math.floor(Math.random() * chars.length);
    result += chars[idx];
  }
  return result;
};

// 파일명/확장자 분리
const getFileNameAndExt = (fileName: string) => {
  const lastDot = fileName.lastIndexOf(".");
  if (lastDot === -1) {
    return { name: fileName, ext: "" };
  }
  const name = fileName.slice(0, lastDot);
  const ext = fileName.slice(lastDot + 1);
  return { name, ext };
};

export default function CreateProductPage() {
  const {
    formData,
    uploadedImages,
    imageFiles,
    isLoading,
    error,
    isPageLoading,
    handleSubmit,
    handleInputChange,
    setFormData,
    setUploadedImages,
    setImageFiles,
  } = useCreateProductForm();

  useEffect(() => {
    if (imageFiles.length > uploadedImages.length) {
      const missingCount = imageFiles.length - uploadedImages.length;
      const newUrls = imageFiles
        .slice(-missingCount)
        .map((file) => URL.createObjectURL(file));
      setUploadedImages((prev) => [...prev, ...newUrls]);
    }
  }, [imageFiles.length, uploadedImages.length, imageFiles, setUploadedImages]);

  // useAuth가 로딩 중이거나, user가 없어 리디렉션 될 때
  if (isPageLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (imageFiles.length >= 1) {
      alert("사진은 1개만 업로드할 수 있습니다.");
      e.target.value = "";
      return;
    }

    const file = files[0];
    if (!file) return;

    // 허용된 파일 형식 검증
    const allowedFormats = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/webp",
    ];
    const allowedExtensions = ["png", "jpg", "jpeg", "gif", "webp"];

    const { ext } = getFileNameAndExt(file.name);
    const isValidType = allowedFormats.includes(file.type.toLowerCase());
    const isValidExt = allowedExtensions.includes(ext.toLowerCase());

    if (!isValidType && !isValidExt) {
      alert("PNG, JPG, JPEG, GIF, WEBP 형식의 이미지만 업로드할 수 있습니다.");
      e.target.value = "";
      return;
    }

    // 새 파일 이름 생성 로직
    const { name: originalName } = getFileNameAndExt(file.name);
    const randomId = generateRandomId(6);
    const safeExt = ext || file.type.split("/")[1] || "img";
    const newFileName = `${originalName}_${safeExt}_${randomId}.${safeExt}`;

    // 이름만 바꾼 새 File 객체 생성
    const renamedFile = new File([file], newFileName, { type: file.type });
    const newUrl = URL.createObjectURL(renamedFile);

    setImageFiles([renamedFile]);
    setUploadedImages([newUrl]);

    e.target.value = "";
  };

  const removeImage = (indexToRemove: number) => {
    const urlToRemove = uploadedImages[indexToRemove];
    if (urlToRemove) {
      URL.revokeObjectURL(urlToRemove);
    }
    setUploadedImages((prev) => prev.filter((_, i) => i !== indexToRemove));
    setImageFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const remainingUploads = 1 - imageFiles.length;
  const isFormValid =
    formData.name && formData.startPrice && imageFiles.length > 0;

  // user가 존재할 때만 페이지 렌더링
  return (
    <main className="bg-background min-h-screen py-4 md:py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4 md:mb-6">
          <h1 className="text-foreground text-xl font-bold md:text-2xl">
            상품 등록
          </h1>
        </div>

        {error && (
          <p className="text-destructive mb-3 text-center text-sm">{error}</p>
        )}

        {/* Form */}
        <div className="space-y-3 md:space-y-4">
          {/* Section 1: Photos */}
          <Card className="border-border bg-card border p-3 md:p-4">
            <h3 className="text-foreground mb-2 text-sm font-semibold md:text-base">
              상품 사진 <span className="text-red-500">*</span>
            </h3>

            <div className="flex gap-2">
              {/* Upload Box */}
              {remainingUploads > 0 && (
                <label className="border-border hover:bg-muted flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors md:h-24 md:w-24">
                  <Upload className="text-muted-foreground h-6 w-6 md:h-8 md:w-8" />
                  <input
                    type="file"
                    accept="image/png,image/jpg,image/jpeg,image/gif,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={imageFiles.length >= 1}
                  />
                </label>
              )}

              {/* Uploaded Images */}
              {uploadedImages.map((img, idx) => (
                <div key={idx} className="group relative">
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`Upload ${idx + 1}`}
                    width={96}
                    height={96}
                    className="border-border h-20 w-20 rounded-lg border object-cover md:h-24 md:w-24"
                  />
                  <button
                    onClick={() => removeImage(idx)}
                    className="bg-destructive text-primary-foreground absolute -top-1 -right-1 rounded-full p-1 text-xs opacity-100 md:opacity-0 md:group-hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Section 2: Product Details */}
          <Card className="border-border bg-card border p-3 md:p-4">
            <h3 className="text-foreground mb-2 text-sm font-semibold md:text-base">
              상품 정보
            </h3>

            <div className="space-y-2.5 md:space-y-3">
              {/* Title */}
              <div>
                <label className="text-foreground mb-1 block text-xs font-medium md:text-sm">
                  상품명 <span className="text-red-500">*</span>
                </label>
                <Input
                  name="name"
                  placeholder="상품명 입력"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="h-9 w-full text-sm md:text-base"
                />
              </div>

              {/* Category & Condition */}
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <div>
                  <label className="text-foreground mb-1 block text-xs font-medium md:text-sm">
                    카테고리 <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="border-border bg-background text-foreground focus:ring-primary h-9 w-full rounded-md border px-2 text-sm focus:ring-2 focus:outline-none md:text-base"
                  >
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-foreground mb-1 block text-xs font-medium md:text-sm">
                    상품 상태 <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="productStatus"
                    value={formData.productStatus}
                    onChange={handleInputChange}
                    className="border-border bg-background text-foreground focus:ring-primary h-9 w-full rounded-md border px-2 text-sm focus:ring-2 focus:outline-none md:text-base"
                  >
                    {PRODUCT_STATUS.map((cond) => (
                      <option key={cond.value} value={cond.value}>
                        {cond.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-foreground mb-1 block text-xs font-medium md:text-sm">
                  상품 설명
                </label>
                <textarea
                  name="description"
                  placeholder="상품 상태 및 특징을 입력해주세요"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="border-border bg-background text-foreground focus:ring-primary w-full rounded-md border px-2 py-2 text-sm focus:ring-2 focus:outline-none md:text-base"
                />
              </div>
            </div>
          </Card>

          {/* Section 3: Pricing & Duration */}
          <Card className="border-border bg-card border p-3 md:p-4">
            <h3 className="text-foreground mb-2 text-sm font-semibold md:text-base">
              가격 및 경매 기간
            </h3>

            <div className="space-y-2.5 md:space-y-3">
              {/* Starting Price */}
              <div>
                <label className="text-foreground mb-1 block text-xs font-medium md:text-sm">
                  시작 가격 <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="text-muted-foreground text-sm font-semibold md:text-base">
                    ₩
                  </span>
                  <Input
                    type="number"
                    name="startPrice"
                    placeholder="0"
                    value={formData.startPrice}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || value.length <= 12) {
                        setFormData((prev) => ({
                          ...prev,
                          startPrice: value,
                        }));
                      }
                    }}
                    className="h-9 flex-1 text-sm md:text-base"
                    step="1"
                    min="0"
                  />
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="text-foreground mb-1 block text-xs font-medium md:text-sm">
                  경매 종료 날짜 <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  name="bidEndDate"
                  value={formData.bidEndDate || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bidEndDate: e.target.value,
                    }))
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className="h-9 w-full text-sm md:text-base"
                />
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || isLoading}
            className="h-10 w-full text-sm md:text-base"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "상품 등록하기"
            )}
          </Button>
        </div>
      </div>
    </main>
  );
}
