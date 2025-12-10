import React from "react";

export function Card({ className = "", children }) {
  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ className = "", children }) {
  return (
    <div className={`text-gray-800 dark:text-gray-200 ${className}`}>
      {children}
    </div>
  );
}
