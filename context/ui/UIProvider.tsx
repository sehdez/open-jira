import { FC, useReducer, PropsWithChildren } from "react";
import { UIContext, uiReducer } from "./";


export interface UIState{
    sideMenuOpen:  boolean;
    isAddingEntry: boolean
    isDragging:    boolean;
}

const UI_INITAL_STATE: UIState = {
    sideMenuOpen:  false,
    isAddingEntry: false,
    isDragging:    false
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

    const toggleAddingEntry = ( isAddingEntry: boolean ) => {
        dispatch({ type: 'UI - Toggle NewEntry', payload: isAddingEntry})
    }

    const startDragging = () => {
        dispatch({type:'UI - Start Dragging'});
    }

    const endDragging = () => {
        dispatch({type:'UI - End Dragging'});
    }

    return (
        <UIContext.Provider value={{
            ...state,
            closeSideMenu,
            openSideMenu,
            toggleAddingEntry,
            startDragging,
            endDragging
        }}>
            { children }
        </UIContext.Provider>
    )
}
