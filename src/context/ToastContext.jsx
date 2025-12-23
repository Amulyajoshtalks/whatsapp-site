import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

const ToastContext = createContext(null);

function id() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const baseStyles =
  "pointer-events-auto w-[min(92vw,420px)] rounded-xl border px-4 py-3 shadow-lg backdrop-blur bg-white";

const variantStyles = {
  success: "border-green-200",
  error: "border-red-200",
  info: "border-slate-200",
};

const titleStyles = {
  success: "text-green-700",
  error: "text-red-700",
  info: "text-slate-800",
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const remove = useCallback((toastId) => {
    setToasts((prev) => prev.filter((t) => t.id !== toastId));
    const timer = timers.current.get(toastId);
    if (timer) clearTimeout(timer);
    timers.current.delete(toastId);
  }, []);

  const push = useCallback(
    ({ title, message, variant = "info", durationMs = 3500 }) => {
      const toastId = id();
      const toast = { id: toastId, title, message, variant };
      setToasts((prev) => [...prev, toast]);

      const timer = setTimeout(() => remove(toastId), durationMs);
      timers.current.set(toastId, timer);
      return toastId;
    },
    [remove]
  );

  const api = useMemo(
    () => ({
      success: (title, message, opts) => push({ title, message, variant: "success", ...opts }),
      error: (title, message, opts) => push({ title, message, variant: "error", ...opts }),
      info: (title, message, opts) => push({ title, message, variant: "info", ...opts }),
      remove,
    }),
    [push, remove]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        className="fixed z-[10000] top-4 right-4 flex flex-col gap-2 pointer-events-none"
        aria-live="polite"
        aria-relevant="additions removals"
      >
        {toasts.map((t) => (
          <div key={t.id} className={`${baseStyles} ${variantStyles[t.variant] || variantStyles.info}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                {t.title ? (
                  <div className={`font-semibold text-sm ${titleStyles[t.variant] || titleStyles.info}`}>
                    {t.title}
                  </div>
                ) : null}
                {t.message ? (
                  <div className="text-sm text-slate-700 mt-0.5 break-words">{t.message}</div>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => api.remove(t.id)}
                className="text-slate-400 hover:text-slate-700 transition pointer-events-auto"
                aria-label="Dismiss notification"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}



