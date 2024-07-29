"use client";
import { createContext, useState, useEffect } from "react";

import { api } from "@/services/api";

import { AuthLoading } from "@/components/AuthLoading";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface User {
  isAuthenticated: boolean;
  id: string;
  name: string;
  email: string;
  role: "buyer" | "seller";
}

interface AuthContextType {
  user: User;
  register: (
    email: string,
    password: string,
    role: "seller" | "buyer",
    name: string
  ) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const recoveredToken = localStorage.getItem("@go-books/token");
    const recoveredUser = localStorage.getItem("@go-books/user");

    if (recoveredUser && recoveredToken) {
      api.defaults.headers.Authorization = `Bearer ${recoveredToken}`;
      setAuthLoading(false);
      return { ...JSON.parse(recoveredUser) } as User;
    }
    setAuthLoading(false);
    return { isAuthenticated: false } as User;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(user);

    localStorage.setItem("@go-books/user", stateJSON);
  }, [user]);

  const login = async (email: string, password: string) => {
    setAuthLoading(true);

    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      const token = response.data.access_token;
      const user = response.data.user;

      localStorage.setItem("@go-books/token", token);

      setUser({ ...user, isAuthenticated: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        setAuthLoading(false);
        return toast.error(error.response?.data.message);
      }

      toast.error("Erro ao fazer login!");
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    role: "seller" | "buyer",
    name: string
  ) => {
    setAuthLoading(true);

    try {
      await api.post("/accounts", {
        email,
        password,
        role,
        name,
      });

      login(email, password);
      toast.info("Conta criada com sucesso!");
    } catch (error) {
      if (error instanceof AxiosError) {
        setAuthLoading(false);
        return toast.error(error.response?.data.message);
      }

      toast.error("Erro ao criar conta!");
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    setUser({} as User);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
      {authLoading && <AuthLoading />}
    </AuthContext.Provider>
  );
};
