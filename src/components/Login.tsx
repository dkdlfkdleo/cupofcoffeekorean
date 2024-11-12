// src/components/Login.tsx
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { user, signInWithGoogle, logout } = useAuth();

  return (
    <div>
      {user ? (
        <div>
          <p>안녕하세요, {user.displayName}님!</p>
          <button onClick={logout}>로그아웃</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>구글로 로그인</button>
      )}
    </div>
  );
}
