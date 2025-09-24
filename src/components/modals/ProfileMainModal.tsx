"use client";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft } from "lucide-react";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
}

export default function ProfileMainModal({ children, onClose, open }: Props) {
  if (typeof window === "undefined") return null; // for SSR
  useEffect (() => {
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
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* panel only — no dark overlay */}
          <motion.div
            className="relative bg-white w-full h-full flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* sticky header */}
            <div className="sticky top-0 flex items-center gap-2 p-4 border-b bg-white">
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>

            {/* scrollable content */}
            <div className="overflow-y-auto flex-1">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
