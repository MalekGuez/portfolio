import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadCount, setLoadCount] = useState(0);

    const [delayLoadingBar, setDelayLoadingBar] = useState(true);

    const [bgVisible, setBgVisible] = useState(true);
    const [bgMoveCount, setBgMoveCount] = useState(0);

    return (
        <MenuContext.Provider value={{ bgMoveCount, setBgMoveCount, bgVisible, setBgVisible, isActive, setIsActive, isLoading, setIsLoading, loadCount, setLoadCount, delayLoadingBar, setDelayLoadingBar}}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenuContext = () => {
    return useContext(MenuContext);
};