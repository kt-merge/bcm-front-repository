import { Upload } from "lucide-react";

interface Step1UploadPhotosProps {
  uploadedImages: string[];
  setUploadedImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function Step1UploadPhotos({
  uploadedImages,
  setUploadedImages,
}: Step1UploadPhotosProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground mb-2 text-2xl font-bold">사진 업로드</h2>
        <p className="text-muted-foreground">
          최대 5장까지 업로드 가능합니다. 첫 번째 사진이 대표 사진이 됩니다.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <label className="border-border hover:bg-muted col-span-2 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors md:col-span-1">
          <Upload className="text-muted-foreground mb-2 h-8 w-8" />
          <span className="text-foreground text-sm font-medium">
            사진 업로드
          </span>
          <span className="text-muted-foreground text-xs">최대 5MB</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={uploadedImages.length >= 5}
          />
        </label>

        {uploadedImages.map((img, idx) => (
          <div key={idx} className="group relative">
            <img
              src={img || "/placeholder.svg"}
              alt={`Upload ${idx + 1}`}
              className="h-32 w-full rounded-lg object-cover"
            />
            <button
              onClick={() => removeImage(idx)}
              className="bg-destructive text-primary-foreground absolute top-2 right-2 rounded p-1 opacity-0 transition-opacity group-hover:opacity-100"
            >
              ✕
            </button>
            {idx === 0 && (
              <div className="bg-primary text-primary-foreground absolute top-2 left-2 rounded px-2 py-1 text-xs font-medium">
                대표
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-muted-foreground text-xs">
        {uploadedImages.length}/5 장 업로드됨
      </p>
    </div>
  );
}
