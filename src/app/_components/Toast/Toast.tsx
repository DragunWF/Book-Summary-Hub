import React, { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import styles from "./Toast.module.css";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastItemProps {
  toast: Toast;
  onClose: (id: string) => void;
}

const getIcon = (type: ToastType) => {
  switch (type) {
    case "success":
      return <CheckCircle size={20} />;
    case "error":
      return <AlertCircle size={20} />;
    case "warning":
      return <AlertTriangle size={20} />;
    case "info":
      return <Info size={20} />;
    default:
      return null;
  }
};

export function ToastItem({ toast, onClose }: ToastItemProps) {
  const [isExiting, setIsExiting] = useState(false);
  const duration = toast.duration || 5000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onClose(toast.id);
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, toast.id, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(toast.id);
    }, 300);
  };

  return (
    <div
      className={`${styles.toast} ${styles[toast.type]} ${isExiting ? styles.exit : ""}`}
    >
      <div className={styles.toastIcon}>{getIcon(toast.type)}</div>
      <div className={styles.toastContent}>
        <div className={styles.toastTitle}>{toast.title}</div>
        {toast.description && (
          <div className={styles.toastDescription}>{toast.description}</div>
        )}
      </div>
      <button
        className={styles.toastClose}
        onClick={handleClose}
        aria-label="Close toast"
      >
        <X size={16} />
      </button>
      <div
        className={styles.progressBar}
        style={{
          animationDuration: `${duration}ms`,
        }}
      />
    </div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
}
