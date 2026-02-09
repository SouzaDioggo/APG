import type { Metadata } from "next"
import { Montserrat, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "APG - Educação Empresarial & Treinamento",
  description:
    "Transformamos empresas através de estratégias personalizadas de gestão e desenvolvimento organizacional",
  generator: "v0.app",
  icons: {
    icon: "/APG BRANCO.png", 
    
    apple: "/apple-icon.png", 
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${montserrat.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}