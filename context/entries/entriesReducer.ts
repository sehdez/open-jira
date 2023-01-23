import { EntriesState } from './EntriesProvider';
import { Entry } from '../../interfaces';

type EntriesActionType = 
    | { type : '[Entry] - add', payload:Entry } 

export const entriesReducer = ( state: EntriesState, action: EntriesActionType ): EntriesState => {

    switch( action.type ){
        
        case '[Entry] - add':
            return {
                ...state,
                entries: [...state.entries, action.payload]
            }

        default:
            return state
    }

}