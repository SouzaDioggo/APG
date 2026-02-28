"use client"

import { useEffect, useRef, useState } from "react"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: string // Ex: "0.2s"
}

export function ScrollReveal({ children, className = "", delay = "0s" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Quando o elemento entra na tela
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Para de observar depois que já apareceu uma vez
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      {
        threshold: 0.1, // Dispara quando 10% do elemento estiver visível
        rootMargin: "0px 0px -50px 0px" // Um pequeno ajuste para não disparar muito cedo
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      // Se estiver visível, aplica a animação. Se não, mantém invisível (opacity-0).
      className={`${className} ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      style={{ animationDelay: isVisible ? delay : "0s" }}
    >
      {children}
    </div>
  )
}