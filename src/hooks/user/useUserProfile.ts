import { useState, useEffect } from "react";
import { apiGet, apiPut } from "@/lib/api";
import { formatJoinDate } from "@/lib/utils";

// --- 타입 정의 ---
export type UserProfile = {
  nickname: string;
  joinDate: string;
  rating: number;
  reviews: number;
  phoneNumber: string;
};

type ApiUserResponse = {
  nickname?: string;
  createdAt?: string;
  rating?: number;
  reviews?: number;
  phoneNumber?: string;
};

const INITIAL_USER: UserProfile = {
  nickname: "익명 사용자",
  joinDate: "가입일 정보 없음",
  rating: 0,
  reviews: 0,
  phoneNumber: "",
};

// --- Custom Hook ---
export function useUserProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [error, setError] = useState<string | null>(null);

  // 사용자 정보 로드
  const fetchUserInfo = async () => {
    try {
      setError(null);
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setIsLoading(false);
        return;
      }

      const apiUser = await apiGet<ApiUserResponse>("/api/users/me");

      const fetchedUser: UserProfile = {
        nickname: apiUser.nickname ?? INITIAL_USER.nickname,
        joinDate: apiUser.createdAt
          ? formatJoinDate(apiUser.createdAt)
          : INITIAL_USER.joinDate,
        rating: apiUser.rating ?? INITIAL_USER.rating,
        reviews: apiUser.reviews ?? INITIAL_USER.reviews,
        phoneNumber: apiUser.phoneNumber
          ? String(apiUser.phoneNumber).trim()
          : INITIAL_USER.phoneNumber,
      };

      setUser(fetchedUser);
    } catch (e) {
      console.error("Failed to fetch user data:", e);
      setError("사용자 정보를 불러오는데 실패했습니다.");
      setUser(INITIAL_USER);
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 로드
  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 프로필 저장
  const handleProfileSave = async (
    nickname: string,
    phoneNumber: string,
  ): Promise<void> => {
    try {
      setError(null);
      await apiPut("/api/users/me", {
        nickname,
        phoneNumber,
      });

      setUser((prev) => ({
        ...prev,
        nickname,
        phoneNumber,
      }));
    } catch (e) {
      console.error("Failed to save profile:", e);
      const errorMsg = "프로필 저장에 실패했습니다.";
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  return {
    user,
    isLoading,
    error,
    handleProfileSave,
    refetch: fetchUserInfo,
  };
}
