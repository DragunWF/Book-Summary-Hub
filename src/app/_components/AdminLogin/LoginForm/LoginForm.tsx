import { AlertCircle, Lock, Loader2 } from "lucide-react";
import styles from "./LoginForm.module.css";
import { FormEvent } from "react";

interface LoginFormProps {
  identity: string;
  setIdentity: (value: string) => void;
  passphrase: string;
  setPassphrase: (value: string) => void;
  handleAuth: (e: FormEvent) => void;
  isLoading: boolean;
  error: boolean;
  success: boolean;
  setIsHoveringButton: (value: boolean) => void;
}

export default function LoginForm({
  identity,
  setIdentity,
  passphrase,
  setPassphrase,
  handleAuth,
  isLoading,
  error,
  success,
  setIsHoveringButton,
}: LoginFormProps) {
  return (
    <form onSubmit={handleAuth}>
      {/* Identity Input */}
      <div className={styles.inputGroup}>
        <label htmlFor="identity">IDENTITY</label>
        <div className={styles.inputWrapper}>
          <input
            id="identity"
            name="email" // Added name attribute
            type="text"
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
            placeholder="USER_EMAIL"
            autoComplete="off"
            disabled={isLoading || success}
          />
          <div className="input-border"></div>
        </div>
      </div>

      {/* Passphrase Input */}
      <div className={styles.inputGroup}>
        <label htmlFor="passphrase">PASSPHRASE</label>
        <div className={styles.inputWrapper}>
          <input
            id="passphrase"
            name="password" // Added name attribute
            type="password"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            placeholder="••••••••••••"
            disabled={isLoading || success}
          />
          <div className="input-border"></div>
        </div>
      </div>

      {/* Error Message */}
      <div className={`${styles.errorMessage} ${error ? styles.visible : ""}`}>
        <AlertCircle size={14} />
        <span>CREDENTIALS REQUIRED</span>
      </div>

      {/* Unlock Button */}
      <button
        type="submit"
        className={`${styles.unlockBtn} ${isLoading ? styles.loading : ""} ${
          success ? styles.success : ""
        }`}
        onMouseEnter={() => setIsHoveringButton(true)}
        onMouseLeave={() => setIsHoveringButton(false)}
        disabled={isLoading || success}
      >
        <div className={styles.btnContent}>
          {isLoading ? (
            <>
              <Loader2 className={styles.spinner} size={18} />
              <span>DECRYPTING...</span>
            </>
          ) : success ? (
            <>
              <Lock size={18} className={styles.unlockedIcon} />
              <span>ACCESS GRANTED</span>
            </>
          ) : (
            <>
              <Lock size={18} />
              <span>AUTHENTICATE</span>
            </>
          )}
        </div>
      </button>
    </form>
  );
}
