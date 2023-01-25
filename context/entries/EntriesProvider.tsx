import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import { v4 as uuidv4 } from 'uuid';
import entriesApi from '../../apis/entriesApi';


export interface EntriesState{
    entries: Entry [];
}

const Entries_INITAL_STATE: EntriesState = {
    entries: []
}

export const EntriesProvider:FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer( entriesReducer, Entries_INITAL_STATE )

    const addNewEntry = ( description: string ) => {
        const newEntry: Entry = {
            _id:uuidv4(),
            createdAt: 0,
            description,
            status:'pending'
        }
        dispatch({type:'[Entry] - add', payload: newEntry});

    }

    const UpdateEntry = ( entry: Entry ) => {
        dispatch({ type:'[Entry] - update', payload: entry })
    }

    const refreshEntries = async() => {
        try{
            const { data } = await entriesApi.get<Entry[]>('/entries');
            dispatch({ type:'[Entry] - refresh-data', payload: data })
        }catch(e){
            console.log(e)
        }
    }

    useEffect( () => {
        refreshEntries();
    },[])

    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            UpdateEntry
        }}>
            { children }
        </EntriesContext.Provider>
    )
}