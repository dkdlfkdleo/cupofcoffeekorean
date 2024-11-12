// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      // Firebase에 이메일과 비밀번호로 회원가입 처리
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 이메일 인증 요청
      await sendEmailVerification(user);
      alert("회원가입이 완료되었습니다. 이메일을 확인하고 인증을 완료해주세요.");

      // 로그인 페이지로 이동
      router.push("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="국가번호 (예: +82)"
        value={countryCode}
        onChange={(e) => setCountryCode(e.target.value)}
      />
      <input
        type="text"
        placeholder="전화번호"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleRegister}>회원가입</button>
    </div>
  );
}

