"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button"; // 버튼 컴포넌트 재사용
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"; // 아이콘
import { apiPost } from "@/lib/api"; // API 함수

// 실제 내용을 보여주는 컴포넌트
function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // 주소창의 토큰 가져오기

  // 입력값들을 저장할 상자들
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 비밀번호 변경 버튼을 눌렀을 때 실행되는 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. 유효성 검사
    if (!token) {
      alert("잘못된 접근입니다. (토큰이 없습니다)");
      return;
    }
    if (password.length < 8) {
      alert("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }
    if (password !== confirmPassword) {
      alert("비밀번호가 서로 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);

    try {
      // 2. 백엔드에 전송 (토큰 + 새 비밀번호)
      // TODO: 나중에 백엔드 담당자가 알려주는 '비밀번호 변경 API 주소'로 교체해야 합니다!
      await apiPost("/api/auth/password/reset", {
        token: token,
        newPassword: password,
      });

      // 3. 성공 시
      alert("비밀번호가 성공적으로 변경되었습니다! 로그인 페이지로 이동합니다.");
      router.push("/login"); // 로그인 페이지로 쫓아내기

    } catch (error) {
      console.error(error);
      alert("비밀번호 변경에 실패했습니다. 링크가 만료되었거나 이미 사용된 링크일 수 있습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 토큰이 없으면 아예 빨간 경고창 보여주기
  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-lg border border-red-200 bg-white p-8 text-center shadow-sm">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-xl font-bold text-gray-900">잘못된 접근입니다</h1>
          <p className="mt-2 text-gray-600">
            유효하지 않은 링크입니다.<br />
            이메일에서 링크를 다시 확인해주세요.
          </p>
          <Button 
            className="mt-6 w-full" 
            onClick={() => router.push("/login")}
          >
            로그인으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  // 정상적인 경우 (입력 폼 보여주기)
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        {/* 헤더 */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">비밀번호 재설정</h1>
          <p className="mt-2 text-sm text-gray-600">
            새로운 비밀번호를 입력해 주세요.
          </p>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 새 비밀번호 입력 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              새 비밀번호
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* 비밀번호 확인 입력 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              새 비밀번호 확인
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${
                confirmPassword && password !== confirmPassword
                  ? "border-red-500 focus:ring-red-200" // 불일치하면 빨간 테두리
                  : "border-gray-300 focus:border-primary focus:ring-primary/20"
              }`}
            />
            {/* 불일치 메시지 */}
            {confirmPassword && password !== confirmPassword && (
              <p className="text-xs text-red-500">비밀번호가 일치하지 않습니다.</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-6 text-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              "비밀번호 변경하기"
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}

// 메인 페이지 (Suspense 필수)
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}