import { createContext } from "react";

interface ContextProps{
    sideMenuOpen :     boolean;
    isAddingEntry:     boolean;
    closeSideMenu:     () => void;
    openSideMenu:      () => void;
    toggleAddingEntry: ( isAddingEntry: boolean ) => void;
}

export const UIContext = createContext({} as ContextProps);

