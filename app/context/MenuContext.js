import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadCount, setLoadCount] = useState(0);

    const [delayLoadingBar, setDelayLoadingBar] = useState(true);

    return (
        <MenuContext.Provider value={{ isActive, setIsActive, isLoading, setIsLoading, loadCount, setLoadCount, delayLoadingBar, setDelayLoadingBar}}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenuContext = () => {
    return useContext(MenuContext);
};