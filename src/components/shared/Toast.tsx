'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { Check } from 'lucide-react';

interface ToastContextValue {
  showToast: (message: string, accent?: string) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ message: string; accent: string; id: number } | null>(null);

  const showToast = useCallback((message: string, accent = '#D4772E') => {
    const id = Date.now();
    setToast({ message, accent, id });
    setTimeout(() => setToast((prev) => (prev?.id === id ? null : prev)), 2200);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          key={toast.id}
          className="fixed bottom-6 right-6 z-[200] toast-enter flex items-center gap-2 px-4 py-2.5 rounded-lg bg-ink-900 border border-ink-700 shadow-lg"
        >
          <Check size={14} style={{ color: toast.accent }} />
          <span className="text-[13px] text-ink-200">{toast.message}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
}
