'use client'

import React, { useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({
  children,
  onClose,
  disableClose = false,
}: {
  children: React.ReactNode;
  onClose: () => void;
  disableClose?: boolean;
}) {
  // Make sure we’re on the client
  if (typeof document === "undefined") return null;
  useEffect(() => {
    // lock background scroll
    document.body.style.overflow = 'hidden';
    console.log("modal mount");
    
    return () => {
      // restore when modal unmounts
      document.body.style.overflow = '';
    console.log("modal unmount");

    };
  }, []);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-950/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative min-w-lg w-fit m-4">
        <button
          onClick={onClose}
          disabled = {disableClose}
          className={`absolute -top-3 -right-3 z-10 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 ${ disableClose ? "hidden" : "block"}`}
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 bg-white dark:bg-[#303030] rounded-full p-1 shadow-lg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="bg-white dark:bg-[#303030] rounded-2xl shadow-xl p-6 w-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body // 👈 this puts it at the very end of <body>
  );
}
