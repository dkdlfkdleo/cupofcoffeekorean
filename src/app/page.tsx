// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsAuthenticated(false);
  };

  const handleImageClick = () => {
    router.push("/greeting"); // greeting 페이지로 이동
  };

  return (
    <div className="main-container">
      <header className="header">
        <h1>Welcome to Cup of Coffee Korean</h1>
        {isAuthenticated ? (
          <button className="logout-button" onClick={handleLogout}>로그아웃</button>
        ) : (
          <div className="auth-buttons">
            <button className="login-button" onClick={() => router.push("/login")}>로그인</button>
            <button className="register-button" onClick={() => router.push("/register")}>회원가입</button>
          </div>
        )}
      </header>

      <main>
        <div className="greeting-image" onClick={handleImageClick}>
          <img src="/greeting-image.jpg" alt="Greetings from Cup of Coffee Korean" />
          <p className="main-text">Greetings from Cup of Coffee Korean</p>
          <p className="sub-text">Cup of Coffee Korean에 오신 걸 환영해요!</p>
          <p className="sub-text">Click the image to start your Korean journey.</p>
          <p className="sub-text">이미지를 클릭하고 한국어 여정을 시작해보세요.</p>
        </div>
      </main>
    </div>
  );
}


