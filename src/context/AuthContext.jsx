import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const TOKEN_KEY = "access_token";

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    delete axiosInstance.defaults.headers.common["Authorization"];
  };

  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post("/token", {
        email,
        password,
      });
  
      const token = res.data.access_token;
      saveToken(token);
      await fetchUser();
  
      return { success: true }; 
    } catch (err) {
      console.error("Error en login:", err);
      return {
        success: false,
        message: "Correo o contraseña incorrectos",
      };
    }
  };
  const logout = () => {
    removeToken();
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/me"); 
      setUser(res.data);
    } catch (err) {
      console.error("Error al obtener usuario:", err);
      logout(); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      saveToken(token);
      fetchUser();
    } else {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
