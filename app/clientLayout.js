"use client";

import { MenuProvider } from "./context/MenuContext";

export default function ClientLayout({ children }) {
    return (
        <MenuProvider>
            {children}
        </MenuProvider>
    );
}