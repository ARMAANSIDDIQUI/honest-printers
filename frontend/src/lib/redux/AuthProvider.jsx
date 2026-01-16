"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure, logout } from "@/lib/redux/slices/userSlice";
import api from "@/lib/api";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
          dispatch(logout()); // Ensure state is clear
          return;
      }

      try {
        // Verify token and get user data
        const { data } = await api.get('/auth/me');
        dispatch(loginSuccess(data));
      } catch (error) {
        console.error("Session restoration failed", error);
        localStorage.removeItem('token'); // Clear invalid token
        dispatch(logout());
      }
    };

    checkAuth();
  }, [dispatch]);

  return children;
}
