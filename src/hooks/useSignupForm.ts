"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export function useSignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    // ... (기존 유효성 검사 로직 동일) ...
    const newErrors: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "유효한 이메일을 입력해주세요.";
    }
    if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }
    if (!formData.nickname.trim()) {
      newErrors.nickname = "닉네임을 입력해주세요.";
    }
    if (!formData.phone.match(/^\d{10,11}$/)) {
      newErrors.phone = "유효한 전화번호를 입력해주세요.";
    }
    if (!termsAccepted) {
      newErrors.terms = "약관에 동의해야 합니다.";
    }
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ... (기존 핸들러 동일) ...
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 입력 시 필드 에러 및 전체 'form' 에러 초기화
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (errors.form) setErrors((prev) => ({ ...prev, form: "" }));
  };

  // 2. handleSubmit 수정
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({}); // 이전 서버 에러(form) 초기화

    try {
      // 3. 백엔드 DTO에 맞게 confirmPassword 제외
      const { confirmPassword, ...signupData } = formData;

      // 4. 백엔드 회원가입 API 호출
      await axios.post("http://localhost:8080/api/auth/register", signupData);

      // 5. 성공 시
      alert("회원가입에 성공했습니다. 로그인 페이지로 이동합니다.");
      router.push("/login");
    } catch (error) {
      // 6. 상세한 에러 처리
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          // 409 Conflict (중복)
          setErrors({ form: "이미 사용 중인 이메일 또는 닉네임입니다." });
        } else {
          setErrors({ form: "회원가입에 실패했습니다. 다시 시도해주세요." });
        }
      } else {
        setErrors({ form: "알 수 없는 오류가 발생했습니다." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    termsAccepted,
    setTermsAccepted,
    handleChange,
    handleSubmit,
  };
}
