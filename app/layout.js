import { Inter } from "next/font/google";
import "./styles/globals.css";

import Header from "@/components/Header";
import ClientLayout from "./clientLayout";

const inter = Inter({ weight: ['400', '500', '600', '700', '800', '900'], subsets: ['latin'] });

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
        <ClientLayout>
          <Header />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
