import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("laundrypro_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    async function restore() {
      const token = localStorage.getItem("laundrypro_token");
      if (!token) {
        setBooting(false);
        return;
      }
      try {
        const { data } = await api.get("/auth/me");
        setUser(data.user);
        localStorage.setItem("laundrypro_user", JSON.stringify(data.user));
      } catch {
        localStorage.removeItem("laundrypro_token");
        localStorage.removeItem("laundrypro_user");
        setUser(null);
      } finally {
        setBooting(false);
      }
    }
    restore();
  }, []);

  async function login(values) {
    const { data } = await api.post("/auth/login", values);
    localStorage.setItem("laundrypro_token", data.token);
    localStorage.setItem("laundrypro_user", JSON.stringify(data.user));
    setUser(data.user);
    toast.success(`Welcome back, ${data.user.name}`);
    return data.user;
  }

  async function register(values) {
    const { data } = await api.post("/auth/register", values);
    localStorage.setItem("laundrypro_token", data.token);
    localStorage.setItem("laundrypro_user", JSON.stringify(data.user));
    setUser(data.user);
    toast.success("Account created");
    return data.user;
  }

  function logout() {
    localStorage.removeItem("laundrypro_token");
    localStorage.removeItem("laundrypro_user");
    setUser(null);
    toast.success("Logged out");
  }

  const value = useMemo(() => ({ user, booting, login, register, logout }), [user, booting]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
