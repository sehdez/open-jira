import { FC, useReducer, PropsWithChildren } from "react";
import { UIContext, uiReducer } from "./";


export interface UIState{
    sideMenuOpen: boolean;
}

const UI_INITAL_STATE: UIState = {
    sideMenuOpen: false
}

export const UIProvider:FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer( uiReducer, UI_INITAL_STATE )

    const closeSideMenu = () => {
        dispatch({
            type: 'UI - Close Sidebar'
        })
    }
    const openSideMenu = () => {
        dispatch({
            type: 'UI - Open Sidebar'
        })
    }

    return (
        <UIContext.Provider value={{
            ...state,
            closeSideMenu,
            openSideMenu
        }}>
            { children }
        </UIContext.Provider>
    )
}
