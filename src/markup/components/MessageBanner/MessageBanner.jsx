import React from "react";

function MessageBanner({ type = "info", message, onClose }) {
  if (!message) return null;
  const cls = `message-banner ${type}`;
  return (
    <div className={cls} role={type === "error" ? "alert" : "status"}>
      <span className="message-text">{message}</span>
      <button className="close-btn" onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  );
}

export default MessageBanner;
