"use client";

import { Button } from "@/components/ui/button";
import { FormInput } from "./FormInput";
import { TermsCheckbox } from "./TermsCheckbox";
import { useSignupForm } from "@/hooks/user/useSignupForm";
import { useState } from "react";

export function SignupForm() {
  const {
    formData,
    errors,
    isLoading,
    termsAccepted,
    handleChange,
    handleSubmit,
    setTermsAccepted,
  } = useSignupForm();

  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [phoneVerificationSent, setPhoneVerificationSent] = useState(false);
  const [emailCode, setEmailCode] = useState("");
  const [phoneCode, setPhoneCode] = useState("");

  const handleSendEmailVerification = () => {
    // TODO: 이메일 인증 코드 발송 API 호출
    setEmailVerificationSent(true);
    console.log("이메일 인증 코드 발송:", formData.email);
  };

  const handleVerifyEmail = () => {
    // TODO: 이메일 인증 코드 확인 API 호출
    console.log("이메일 인증 확인:", emailCode);
    setEmailVerified(true);
  };

  const handleSendPhoneVerification = () => {
    // TODO: 휴대폰 인증 코드 발송 API 호출
    setPhoneVerificationSent(true);
    console.log("휴대폰 인증 코드 발송:", formData.phoneNumber);
  };

  const handleVerifyPhone = () => {
    // TODO: 휴대폰 인증 코드 확인 API 호출
    console.log("휴대폰 인증 확인:", phoneCode);
    setPhoneVerified(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 이메일 + 인증 */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <div className="flex-1">
            <FormInput
              label="이메일"
              name="email"
              type="email"
              placeholder="your@example.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              disabled={emailVerified}
            />
          </div>
          <div className="flex items-end">
            <Button
              type="button"
              variant="outline"
              className="h-10 whitespace-nowrap"
              onClick={handleSendEmailVerification}
              disabled={
                emailVerified || !formData.email || emailVerificationSent
              }
            >
              {emailVerified
                ? "인증완료"
                : emailVerificationSent
                  ? "재발송"
                  : "인증요청"}
            </Button>
          </div>
        </div>

        {/* 이메일 인증 코드 입력 */}
        {emailVerificationSent && !emailVerified && (
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="text"
                placeholder="인증 코드 입력"
                value={emailCode}
                onChange={(e) => setEmailCode(e.target.value)}
                className="border-border bg-background text-foreground placeholder-muted-foreground focus:ring-primary h-10 w-full rounded-md border px-3 text-sm focus:ring-2 focus:outline-none"
              />
            </div>
            <Button
              type="button"
              variant="default"
              className="h-10 whitespace-nowrap"
              onClick={handleVerifyEmail}
              disabled={!emailCode}
            >
              확인
            </Button>
          </div>
        )}
      </div>

      <FormInput
        label="비밀번호"
        name="password"
        type="password"
        placeholder="••••••••"
        autoComplete="new-password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />
      <FormInput
        label="비밀번호 확인"
        name="confirmPassword"
        type="password"
        placeholder="••••••••"
        autoComplete="new-password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />
      <FormInput
        label="닉네임"
        name="nickname"
        type="text"
        placeholder="익명으로 사용할 닉네임"
        value={formData.nickname}
        onChange={handleChange}
        error={errors.nickname}
      />

      {/* 전화번호 + 인증 */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <div className="flex-1">
            <FormInput
              label="전화번호"
              name="phoneNumber"
              type="tel"
              placeholder="01012345678"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={errors.phoneNumber}
              disabled={phoneVerified}
            />
          </div>
          <div className="flex items-end">
            <Button
              type="button"
              variant="outline"
              className="h-10 whitespace-nowrap"
              onClick={handleSendPhoneVerification}
              disabled={
                phoneVerified || !formData.phoneNumber || phoneVerificationSent
              }
            >
              {phoneVerified
                ? "인증완료"
                : phoneVerificationSent
                  ? "재발송"
                  : "인증요청"}
            </Button>
          </div>
        </div>

        {/* 휴대폰 인증 코드 입력 */}
        {phoneVerificationSent && !phoneVerified && (
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="text"
                placeholder="인증 코드 입력"
                value={phoneCode}
                onChange={(e) => setPhoneCode(e.target.value)}
                className="border-border bg-background text-foreground placeholder-muted-foreground focus:ring-primary h-10 w-full rounded-md border px-3 text-sm focus:ring-2 focus:outline-none"
              />
            </div>
            <Button
              type="button"
              variant="default"
              className="h-10 whitespace-nowrap"
              onClick={handleVerifyPhone}
              disabled={!phoneCode}
            >
              확인
            </Button>
          </div>
        )}
      </div>

      <TermsCheckbox
        checked={termsAccepted}
        onCheckedChange={setTermsAccepted}
        error={errors.terms}
      />
      <Button
        type="submit"
        size="lg"
        className="w-full rounded-lg"
        disabled={isLoading || !emailVerified || !phoneVerified}
      >
        {isLoading ? "계정 만드는 중..." : "계정 만들기"}
      </Button>
    </form>
  );
}
