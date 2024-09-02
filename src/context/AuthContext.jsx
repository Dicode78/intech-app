import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      checkTokenExpiration();
    } else {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    }
  }, [token]);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const checkTokenExpiration = () => {
    const tokenData = parseJwt(token);
    const currentTime = Math.floor(Date.now() / 1000);
    const timeLeft = tokenData.exp - currentTime;

    if (timeLeft < 60) {
      showModal();
    }
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const renewToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/renew-token",
        { token }
      );
      setToken(response.data.token);
    } catch (error) {
      console.error("Failed to renew token", error);
      logout();
    }
  };

  const showModal = () => {
    if (
      window.confirm(
        "Votre session est sur le point d'expirer. Voulez-vous rester connecté ?"
      )
    ) {
      renewToken();
    } else {
      logout();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 30000); // Vérifier toutes les 30 secondes

    return () => clearInterval(interval);
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
