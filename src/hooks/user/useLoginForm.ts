"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";
import { apiPost, apiGet, setAccessToken } from "@/lib/api";
import { SignInResponse, User } from "@/types";

export function useLoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      // --- 1단계: 로그인 API 호출 ---
      const loginResponse = await apiPost<SignInResponse>("/api/auth/sign-in", {
        email,
        password,
      });

      const { accessToken } = loginResponse;
      if (!accessToken) {
        throw new Error("로그인 응답에 accessToken이 없습니다.");
      }

      // --- [변경] 2단계: Access Token 설정 및 저장 ---

      // 1. API 유틸리티에 토큰 설정 (즉시 사용을 위해 메모리에 세팅)
      setAccessToken(accessToken);

      // 2. 로컬 스토리지에 토큰 영구 저장 (새로고침 시 유지를 위해 추가됨)
      localStorage.setItem("accessToken", accessToken);

      // --- 3단계: 유저 정보 API 호출 (Access Token 사용) ---
      // 위에서 setAccessToken을 했기 때문에 헤더에 토큰이 포함되어 전송됩니다.
      const userData = await apiGet<User>("/api/users/me");

      // --- 4단계: useAuth에 토큰과 유저 정보 저장 (Context 상태 업데이트) ---
      login(accessToken, userData);

      router.push("/");
    } catch (err) {
      const error = err as Error;
      if (error.message.includes("401") || error.message.includes("404")) {
        setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else {
        setError(error.message || "알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { email, password, error, isLoading, handleChange, handleSubmit };
}
