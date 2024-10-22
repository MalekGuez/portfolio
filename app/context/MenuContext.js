import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <MenuContext.Provider value={{ isActive, setIsActive }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenuContext = () => {
    return useContext(MenuContext);
};