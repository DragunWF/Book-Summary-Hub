"use client";

import React, { useState, useEffect } from "react";
import { Shield, Lock, ChevronRight, Loader2, AlertCircle } from "lucide-react";

export default function AdminLoginPrototype() {
  const [identity, setIdentity] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);

  // Reset error state on input change
  useEffect(() => {
    if (error) setError(false);
  }, [identity, passphrase]);

  const handleAuth = (e) => {
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
    <div className="obsidian-wrapper">
      {/* Dynamic Background Mesh */}
      <div className="void-mesh">
        <div className="mesh-gradient g1"></div>
        <div className="mesh-gradient g2"></div>
      </div>

      {/* Main Vault Card */}
      <div
        className={`vault-card ${error ? "shake" : ""} ${success ? "access-granted" : ""} ${isHoveringButton ? "card-glow" : ""}`}
      >
        {/* Header */}
        <div className="vault-header">
          <div className="icon-frame">
            <Shield size={24} className="shield-icon" />
          </div>
          <h1 className="system-title">SYSTEM ACCESS</h1>
          <div className="status-light"></div>
        </div>

        <form onSubmit={handleAuth} className="vault-form">
          {/* Identity Input */}
          <div className="input-group">
            <label htmlFor="identity">IDENTITY</label>
            <div className="input-wrapper">
              <input
                id="identity"
                type="text"
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                placeholder="USER_ID"
                autoComplete="off"
                disabled={isLoading || success}
              />
              <div className="input-border"></div>
            </div>
          </div>

          {/* Passphrase Input */}
          <div className="input-group">
            <label htmlFor="passphrase">PASSPHRASE</label>
            <div className="input-wrapper">
              <input
                id="passphrase"
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
          <div className={`error-message ${error ? "visible" : ""}`}>
            <AlertCircle size={14} />
            <span>CREDENTIALS REQUIRED</span>
          </div>

          {/* Unlock Button */}
          <button
            type="submit"
            className={`unlock-btn ${isLoading ? "loading" : ""} ${success ? "success" : ""}`}
            onMouseEnter={() => setIsHoveringButton(true)}
            onMouseLeave={() => setIsHoveringButton(false)}
            disabled={isLoading || success}
          >
            <div className="btn-content">
              {isLoading ? (
                <>
                  <Loader2 className="spinner" size={18} />
                  <span>DECRYPTING...</span>
                </>
              ) : success ? (
                <>
                  <Lock size={18} className="unlocked-icon" />
                  <span>ACCESS GRANTED</span>
                </>
              ) : (
                <>
                  <Lock size={18} />
                  <span>AUTHENTICATE</span>
                </>
              )}
            </div>
            <div className="btn-glitch"></div>
          </button>
        </form>

        <div className="vault-footer">
          <span>SECURE CONNECTION</span>
          <span className="version">v4.0.2</span>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        /* Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        /* CSS Variables */
        :root {
          --void-bg: #050505;
          --card-bg: rgba(255, 255, 255, 0.02);
          --card-border: rgba(255, 255, 255, 0.08);
          --input-bg: #101012;
          --mage-green: #00FF41;
          --mage-green-dim: rgba(0, 255, 65, 0.1);
          --error-red: #ff3333;
          --text-main: #ffffff;
          --text-muted: #6b7280;
        }

        /* Reset & Base */
        * { box-sizing: border-box; }
        
        .obsidian-wrapper {
          font-family: 'Inter', monospace;
          background-color: var(--void-bg);
          color: var(--text-main);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        /* 1. Background Environment */
        .void-mesh {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }

        .mesh-gradient {
          position: absolute;
          filter: blur(80px);
          opacity: 0.4;
          animation: float 20s infinite ease-in-out;
        }

        .g1 {
          top: -10%;
          left: -10%;
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, #0f1f15 0%, transparent 70%);
        }

        .g2 {
          bottom: -10%;
          right: -10%;
          width: 60vw;
          height: 60vw;
          background: radial-gradient(circle, #0a0a0a 0%, transparent 70%);
          animation-delay: -5s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, 40px); }
        }

        /* 2. The Vault Card */
        .vault-card {
          position: relative;
          z-index: 10;
          width: 400px;
          padding: 40px;
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--card-border);
          border-radius: 16px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        /* Card Glow on Button Hover */
        .vault-card.card-glow {
          border-color: var(--mage-green-dim);
          box-shadow: 0 0 30px rgba(0, 255, 65, 0.05), 0 25px 50px -12px rgba(0, 0, 0, 0.7);
        }

        /* Shake Animation */
        .vault-card.shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
          border-color: rgba(255, 51, 51, 0.4);
        }

        /* Success Animation */
        .vault-card.access-granted {
          transform: scale(1.1);
          opacity: 0;
          filter: blur(20px);
          pointer-events: none;
          transition: all 0.8s ease-in;
        }

        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }

        /* Header */
        .vault-header {
          display: flex;
          align-items: center;
          margin-bottom: 32px;
          gap: 12px;
        }

        .icon-frame {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        
        .shield-icon { color: var(--text-main); }

        .system-title {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--text-main);
          margin: 0;
          flex-grow: 1;
        }

        .status-light {
          width: 8px;
          height: 8px;
          background-color: var(--mage-green);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--mage-green);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { opacity: 0.4; }
          50% { opacity: 1; }
          100% { opacity: 0.4; }
        }

        /* 3. Inputs */
        .input-group {
          margin-bottom: 24px;
        }

        .input-group label {
          display: block;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: var(--text-muted);
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .input-wrapper {
          position: relative;
        }

        .input-wrapper input {
          width: 100%;
          background: var(--input-bg);
          border: 1px solid rgba(255,255,255,0.05);
          color: white;
          padding: 14px 16px;
          font-size: 14px;
          border-radius: 6px;
          outline: none;
          transition: all 0.3s ease;
          font-family: 'Inter', monospace;
        }

        .input-wrapper input::placeholder {
          color: #333;
        }

        /* Glow Effect on Focus */
        .input-wrapper input:focus {
          border-color: var(--mage-green);
          box-shadow: 0 0 0 1px var(--mage-green-dim);
          background: #080808;
        }

        /* 4. Error State */
        .error-message {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--error-red);
          font-size: 12px;
          margin-bottom: 16px;
          opacity: 0;
          transform: translateY(-5px);
          transition: all 0.3s;
          height: 0;
          overflow: hidden;
        }

        .error-message.visible {
          opacity: 1;
          transform: translateY(0);
          height: auto;
        }

        /* 5. The Unlock Button */
        .unlock-btn {
          width: 100%;
          position: relative;
          background: transparent;
          border: 1px solid var(--mage-green);
          color: var(--mage-green);
          padding: 14px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          cursor: pointer;
          border-radius: 6px;
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .btn-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .unlock-btn:hover:not(:disabled) {
          background: var(--mage-green);
          color: #000;
          box-shadow: 0 0 20px var(--mage-green-dim);
        }

        .unlock-btn:disabled {
          opacity: 0.8;
          cursor: wait;
        }
        
        .unlock-btn.success {
          background: var(--mage-green);
          color: #000;
          border-color: var(--mage-green);
        }

        .spinner {
          animation: spin 1s linear infinite;
        }
        
        .unlocked-icon {
          animation: unlock-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes unlock-pop {
          0% { transform: scale(0.5); }
          100% { transform: scale(1); }
        }

        /* Footer */
        .vault-footer {
          margin-top: 32px;
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.05em;
        }
        
        .version { font-family: monospace; }
      `}</style>
    </div>
  );
}
