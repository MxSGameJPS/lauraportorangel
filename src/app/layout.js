import { Playfair_Display, Inter } from "next/font/google";
import HeaderWrapper from "@/components/ClientLayout/HeaderWrapper";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Laura Porto Rangel | Escritora",
  description:
    "Site oficial da escritora Laura Porto Rangel. Lançamentos, encontros literários e amor pela leitura.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${playfair.variable} ${inter.variable}`}>
        <HeaderWrapper />
        {children}
      </body>
    </html>
  );
}
