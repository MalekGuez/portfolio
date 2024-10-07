import { Inter } from "next/font/google";
import "./styles/globals.css";

import Header from "@/components/Header";

const inter = Inter({ subsets: ['latin']});

export const metadata = {
  title: "Malek Guezouli Portfolio",
  description: "Malek Guezouli, Full Stack Developer based in France",
  icons: {
    icon: 'static/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
