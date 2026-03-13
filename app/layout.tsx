import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";

import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "APG Empresa | Consultoria em Gestão de Contratos",
  description:
    "APG - Especialização em gestão de contratos, compliance e proteção de dados. Consultoria empresarial que gera economia e segurança jurídica para seu negócio. Transforme sua empresa com estratégias personalizadas de gestão.",
  keywords: [
    "APG",
    "APGempresa",
    "consultoria empresarial",
    "gestão de contratos",
    "compliance",
    "proteção de dados",
    "educação empresarial",
    "treinamento corporativo",
    "estruturação empresarial",
    "consultoria jurídica",
  ],
  generator: "v0.app",
  authors: [{ name: "APG" }],
  creator: "APG",
  publisher: "APG",
  icons: {
    icon: "/APG BRANCO.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://apgempresa.com",
    title: "APG Empresa | Consultoria em Gestão de Contratos",
    description:
      "Consultoria especializada em gestão de contratos, compliance e proteção de dados que gera economia e segurança jurídica para seu negócio.",
    images: [
      {
        url: "https://apgempresa.com/LOGO%20APG.png",
        width: 1200,
        height: 630,
        alt: "APG - Consultoria Empresarial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "APG Empresa | Consultoria em Gestão de Contratos",
    description:
      "Especialização em gestão de contratos, compliance e proteção de dados.",
  },
  alternates: {
    canonical: "https://apgempresa.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "APG Empresa",
    url: "https://apgempresa.com",
    logo: "https://apgempresa.com/LOGO%20APG.png",
    description:
      "Consultoria especializada em gestão de contratos, compliance e proteção de dados que gera economia e segurança jurídica para seu negócio.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: "pt-BR",
    },
  };

  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>

      <body
        className={`${montserrat.variable} ${playfair.variable} font-sans antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>  
      </body>
    </html>
  );
}
