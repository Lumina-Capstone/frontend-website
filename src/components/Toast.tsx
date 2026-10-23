import { useEffect } from 'react';

export type ToastState = { message: string; type: 'success' | 'error' };

type ToastProps = {
  toast: ToastState | null;
  onDismiss: () => void;
};

export default function Toast({ toast, onDismiss }: ToastProps) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(onDismiss, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, onDismiss]);

  if (!toast) return null;

  const isError = toast.type === 'error';

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:bottom-8 md:right-8 px-4 md:px-6 py-3 md:py-4 rounded-xl shadow-lg border flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 z-50 ${
        isError
          ? 'bg-red-50 text-red-800 border-red-200'
          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
      }`}
    >
      <span className="material-symbols-outlined text-lg md:text-xl">
        {isError ? 'error' : 'check_circle'}
      </span>
      <span className="font-bold text-xs md:text-sm">{toast.message}</span>
    </div>
  );
}
