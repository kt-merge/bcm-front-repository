"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { User, AuthContextType } from "@/types";
import { setAccessToken as setGlobalAccessToken, apiPost } from "@/lib/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  // Access Token은 메모리 상태로만 관리 (localStorage 사용 안 함)
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback((token: string, userData: User) => {
    // 메모리 상태에만 저장
    setAccessToken(token);
    setUser(userData);
    // API fetch wrapper에 토큰 설정
    setGlobalAccessToken(token);
  }, []);

  const logout = useCallback(async () => {
    try {
      // 로그아웃 API 호출 (서버에서 Refresh Token 쿠키 삭제)
      await apiPost("/api/auth/logout");
    } catch (error) {
      console.error("로그아웃 API 호출 실패:", error);
    } finally {
      // 클라이언트 상태 초기화
      setAccessToken(null);
      setUser(null);
      setGlobalAccessToken(null);
      router.push("/login");
    }
  }, [router]);

  const updateNickname = useCallback((nickname: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      return { ...prev, nickname };
    });
  }, []);

  // 페이지 새로고침 시 토큰 복원 불가 (메모리 상태이므로)
  // 대신 /api/auth/me 엔드포인트를 호출해서 사용자 정보 복원 가능
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Refresh Token이 쿠키에 있다면 자동으로 전송됨
        // 백엔드에서 Refresh Token 검증 후 새 Access Token 발급
        const response = await apiPost<{ accessToken: string }>(
          "/api/auth/refresh-on-load",
        );

        if (response.accessToken) {
          setAccessToken(response.accessToken);
          setGlobalAccessToken(response.accessToken);

          // 사용자 정보 가져오기
          const userResponse = await apiPost<User>("/api/users/me");
          setUser(userResponse);
        }
      } catch {
        console.log("인증 정보 없음 또는 만료됨");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, logout, isLoading, updateNickname }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
