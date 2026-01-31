"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "@/lib/redux/slices/userSlice";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

function OAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      // 1. Save token (usually handled by Redux or an API utility wrapper)
      localStorage.setItem('token', token); // Or prefer cookie

      // 2. Fetch User Data
      const fetchUser = async () => {
        try {
          const { data } = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });

          dispatch(loginSuccess(data));
          toast.success(`Welcome back, ${data.name}!`);
          router.push('/account');
        } catch (error) {
          console.error(error);
          dispatch(loginFailure("Failed to retrieve user data"));
          toast.error("Authentication failed. Please try again.");
          router.push('/login');
        }
      };

      fetchUser();
    } else {
      router.push('/login');
    }
  }, [token, dispatch, router]);

  return (
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      <p className="text-slate-600 dark:text-slate-400">Authenticating...</p>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
      <Suspense fallback={
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      }>
        <OAuthCallbackContent />
      </Suspense>
    </div>
  );
}
