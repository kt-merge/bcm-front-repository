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
import {
  setAccessToken as setGlobalAccessToken,
  apiPost,
  apiGet, // apiGet 추가 필요 (유저 정보 조회용)
} from "@/lib/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- [변경] 1. 로그인 함수: 로컬 스토리지 저장 로직 보장 ---
  const login = useCallback((token: string, userData: User) => {
    localStorage.setItem("accessToken", token); // 스토리지 저장
    setGlobalAccessToken(token); // API 유틸리티에 설정
    setUser(userData); // 상태 업데이트
    // router.refresh(); // Client Side Navigation에서는 굳이 새로고침 불필요
  }, []);

  // --- 2. 로그아웃 함수: 로컬 스토리지 삭제 추가 ---
  const logout = useCallback(async () => {
    try {
      await apiPost("/api/auth/logout");
    } catch (error) {
      console.error("로그아웃 API 호출 실패:", error);
    } finally {
      localStorage.removeItem("accessToken"); // 스토리지 삭제
      setGlobalAccessToken(null);
      setUser(null);
      router.push("/login");
    }
  }, [router]);

  const updateNickname = useCallback((nickname: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      return { ...prev, nickname };
    });
  }, []);

  // --- 3. 초기화 로직 (새로고침 시 실행) ---
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem("accessToken");

        // 1) 토큰이 없다면 => 비로그인 상태로 초기화 완료
        if (!storedToken) {
          setIsLoading(false);
          return;
        }

        // 2) 토큰이 있다면 => API 헤더 설정 및 유저 정보 복구 시도
        setGlobalAccessToken(storedToken);

        // 토큰만으로는 유저 정보(닉네임, 권한 등)를 알 수 없으므로 내 정보 조회 API 호출
        const userData = await apiGet<User>("/api/users/me");
        setUser(userData);
      } catch (error) {
        console.error("토큰 복원 실패 (만료됨):", error);
        // 토큰이 유효하지 않다면(401 등) 정보 삭제 및 로그아웃 처리
        localStorage.removeItem("accessToken");
        setGlobalAccessToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []); // 의존성 배열을 비워 마운트 시 1회만 실행

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken: null,
        login,
        logout,
        isLoading,
        updateNickname,
      }}
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
