import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("로그인 실패");
      const data = await res.json();

      // 로그인 성공 시 JWT + 사용자 정보 저장
      login(data.accessToken, data.user);

      router.push("/"); // 메인 페이지로 이동
    } catch (err) {
      const error = err as Error;
      setError(error.message || "로그인 실패");
    } finally {
      setIsLoading(false);
    }
  };

  return { email, password, error, isLoading, handleChange, handleSubmit };
}
