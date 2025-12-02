"use client";

import { MessageCircle, ArrowDown } from "lucide-react";

export function FloatingElements() {
  return (
    <>
      {/* Floating Action Button */}
      <button
        className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
        aria-label="Chat support"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    </>
  );
}
