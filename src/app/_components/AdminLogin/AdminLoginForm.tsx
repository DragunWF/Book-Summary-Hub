"use client";

import { useState, FormEvent } from "react";
import VaultCard from "@/app/_components/AdminLogin/VaultCard/VaultCard";
import LoginForm from "@/app/_components/AdminLogin/LoginForm/LoginForm";
import { adminSignIn } from "@/app/_lib/actions";

export default function AdminLoginForm() {
  const [identity, setIdentity] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false); // Using this for visual feedback for now
  const [success, setSuccess] = useState(false); // Using this for visual feedback for now
  const [isHoveringButton, setIsHoveringButton] = useState(false);

  const onIdentityChange = (value: string) => {
    setIdentity(value);
    if (error) setError(false);
  };

  const onPassphraseChange = (value: string) => {
    setPassphrase(value);
    if (error) setError(false);
  };

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);
    setSuccess(false);

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    try {
      await adminSignIn(formData);
      // If we reach here without error, credentials were correct
      // The redirect will happen on the server side
      setSuccess(true);
    } catch (err) {
      // Check if this is a redirect error (which is expected on successful login)
      // Next.js redirect() throws an error with a specific message
      if (err instanceof Error && err.message.includes("NEXT_REDIRECT")) {
        setSuccess(true);
        return; // Don't set error, the redirect will handle navigation
      }
      
      console.error("Login failed:", err);
      setError(true);
      // Remove error class after animation plays to allow re-trigger
      setTimeout(() => setError(false), 1000); // Give time for visual error to show
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
}
