import { UIState } from './UIProvider';

type UIActionType = 
    | { type : 'UI - Open Sidebar' } 
    | { type : 'UI - Close Sidebar' } 
    | { type : 'UI - Toggle NewEntry', payload:boolean } 

export const uiReducer = ( state: UIState, action: UIActionType ): UIState => {

    switch( action.type ){
        case 'UI - Open Sidebar':
            return {
                ...state,
                sideMenuOpen: true
            }
            
        case 'UI - Close Sidebar':
            return {
                ...state,
                sideMenuOpen: false
            }
        case 'UI - Toggle NewEntry':
            return {
                ...state,
                sideMenuOpen: action.payload
            }

        default:
            return state
    }
}
