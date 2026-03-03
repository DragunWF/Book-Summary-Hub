"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Toast, ToastType, ToastContainer } from "./Toast";

interface ToastContextType {
  addToast: (
    type: ToastType,
    title: string,
    description?: string,
    duration?: number,
  ) => string;
  removeToast: (id: string) => void;
  success: (title: string, description?: string) => string;
  error: (title: string, description?: string) => string;
  info: (title: string, description?: string) => string;
  warning: (title: string, description?: string) => string;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (
      type: ToastType,
      title: string,
      description?: string,
      duration?: number,
    ): string => {
      const id = Math.random().toString(36).substr(2, 9);
      const newToast: Toast = {
        id,
        type,
        title,
        description,
        duration: duration || 5000,
      };
      setToasts((prev) => [...prev, newToast]);
      return id;
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (title: string, description?: string) =>
      addToast("success", title, description, 4000),
    [addToast],
  );

  const error = useCallback(
    (title: string, description?: string) =>
      addToast("error", title, description, 5000),
    [addToast],
  );

  const info = useCallback(
    (title: string, description?: string) =>
      addToast("info", title, description, 4000),
    [addToast],
  );

  const warning = useCallback(
    (title: string, description?: string) =>
      addToast("warning", title, description, 4000),
    [addToast],
  );

  return (
    <ToastContext.Provider
      value={{ addToast, removeToast, success, error, info, warning }}
    >
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
