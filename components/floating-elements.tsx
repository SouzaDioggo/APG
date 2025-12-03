"use client";

import { MessageCircle, ArrowDown } from "lucide-react";
import { AiOutlineWhatsApp } from "react-icons/ai";

export function FloatingElements() {
  return (
    <>
      {/* Floating Action Button */}

      <a
        href="https://wa.me/5521994691406?text=Ol%C3%A1%21%20Vi%20o%20blog%20da%20empresa%20e%20me%20interessei%20bastante%20pelo%20trabalho%20de%20voc%C3%AAs%2C%20especialmente%20sobre%20os%20servi%C3%A7os%20apresentados.%20Poderia%20me%20explicar%20melhor%20como%20funciona%3F
"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
        aria-label="Chat support"
      >
        <AiOutlineWhatsApp className="w-7 h-7" />
      </a>
    </>
  );
}
