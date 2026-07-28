import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token"));
  const [role, setRole] = useState(() => localStorage.getItem("admin_role"));
  const [username, setUsername] = useState(() => localStorage.getItem("admin_username"));

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  async function login(usernameInput, password) {
    const res = await api.post("/api/auth/login", { username: usernameInput, password });
    localStorage.setItem("admin_token", res.data.access_token);
    localStorage.setItem("admin_role", res.data.role);
    localStorage.setItem("admin_username", res.data.username);
    setToken(res.data.access_token);
    setRole(res.data.role);
    setUsername(res.data.username);
  }

  function logout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_role");
    localStorage.removeItem("admin_username");
    setToken(null);
    setRole(null);
    setUsername(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        username,
        isAuthenticated: !!token,
        isOwner: role === "owner",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}