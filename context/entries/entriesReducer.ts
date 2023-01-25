import { EntriesState } from './EntriesProvider';
import { Entry } from '../../interfaces';

type EntriesActionType = 
    | { type : '[Entry] - add', payload:Entry } 
    | { type : '[Entry] - update', payload:Entry } 
    | { type : '[Entry] - refresh-data', payload:Entry[] } 

export const entriesReducer = ( state: EntriesState, action: EntriesActionType ): EntriesState => {

    switch( action.type ){
        
        case '[Entry] - add':
            return {
                ...state,
                entries: [...state.entries, action.payload]
            }
        case '[Entry] - update':
            return {
                ...state,
                entries: state.entries.map( entry => {
                    if(entry._id === action.payload._id){
                        entry.status = action.payload.status;
                        entry.description = action.payload.description;
                    }
                    return entry
                } )
            }
        case '[Entry] - refresh-data':
            return {
                ...state,
                entries: [...action.payload]
            }

        default:
            return state
    }

}