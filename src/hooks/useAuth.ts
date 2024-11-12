// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { firebaseApp } from "../firebaseConfig";

export function useAuth() {
  const [user, setUser] = useState(null);
  const auth = getAuth(firebaseApp);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
  };

  const logout = () => signOut(auth).then(() => setUser(null));

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, [auth]);

  return { user, signInWithGoogle, logout };
}
