"use client";

import { MenuProvider } from "./context/MenuContext";
import { I18nProvider } from "@/i18n/Provider";

export default function ClientLayout({ children }) {
  return (
    <I18nProvider>
      <MenuProvider>{children}</MenuProvider>
    </I18nProvider>
  );
}
