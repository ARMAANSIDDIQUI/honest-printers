"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorReporter({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html>
      <body className="antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Something went wrong!</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            We apologize for the inconvenience. An unexpected error has occurred.
          </p>

          <div className="flex flex-col gap-3">
            <Button 
              onClick={() => reset()} 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="w-full border-slate-200 dark:border-slate-800 gap-2"
            >
              <Home className="w-4 h-4" />
              Return Home
            </Button>
          </div>
          
          {process.env.NODE_ENV === 'development' && error && (
            <div className="mt-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-left overflow-auto max-h-48 text-xs font-mono text-slate-600 dark:text-slate-300">
              <p className="font-bold text-red-500 mb-2">Error Details:</p>
              {error.message}
              {error.digest && <p className="mt-2 text-slate-400">Digest: {error.digest}</p>}
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
