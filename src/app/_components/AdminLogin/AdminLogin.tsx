"use client";

import { useState, FormEvent } from "react";
import Background from "./Background/Background";
import VaultCard from "./VaultCard/VaultCard";
import LoginForm from "./LoginForm/LoginForm";
import styles from "./AdminLogin.module.css";

export default function AdminLogin() {
  const [identity, setIdentity] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);

  const onIdentityChange = (value: string) => {
    setIdentity(value);
    if (error) setError(false);
  };

  const onPassphraseChange = (value: string) => {
    setPassphrase(value);
    if (error) setError(false);
  };

  const handleAuth = (e: FormEvent) => {
    e.preventDefault();

    // Validation
    if (!identity || !passphrase) {
      setError(true);
      // Remove error class after animation plays to allow re-trigger
      setTimeout(() => setError(false), 500);
      return;
    }

    // Mock Authentication Process
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);

      // Reset for demo purposes after the "zoom" effect finishes
      setTimeout(() => {
        // In a real app, this would redirect
        console.log("Redirecting to Admin Dashboard...");
      }, 2000);
    }, 1500);
  };

  return (
    <div className={styles.obsidianWrapper}>
      <Background />

      <VaultCard
        error={error}
        success={success}
        isHoveringButton={isHoveringButton}
      >
        <LoginForm
          identity={identity}
          setIdentity={onIdentityChange}
          passphrase={passphrase}
          setPassphrase={onPassphraseChange}
          handleAuth={handleAuth}
          isLoading={isLoading}
          error={error}
          success={success}
          setIsHoveringButton={setIsHoveringButton}
        />
      </VaultCard>
    </div>
  );
}