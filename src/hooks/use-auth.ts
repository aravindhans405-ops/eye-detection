import { useEffect, useState, useCallback } from "react";

const TOKEN_KEY = "eyeai_token";
const USER_KEY = "eyeai_user";

export interface AuthUser {
  name: string;
  email: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(USER_KEY);
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
    setReady(true);
  }, []);

  const login = useCallback((u: AuthUser) => {
    localStorage.setItem(TOKEN_KEY, "demo-token-" + Date.now());
    localStorage.setItem(USER_KEY, JSON.stringify(u));
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  return { user, ready, login, logout, isAuthed: !!user };
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}
