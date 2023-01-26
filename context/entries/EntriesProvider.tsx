import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import entriesApi from '../../apis/entriesApi';


export interface EntriesState{
    entries: Entry [];
}

const Entries_INITAL_STATE: EntriesState = {
    entries: []
}

export const EntriesProvider:FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer( entriesReducer, Entries_INITAL_STATE )

    const addNewEntry = async( description: string ) => {
        try{
            const { data } = await entriesApi.post<Entry>('/entries', {description});
            dispatch({type:'[Entry] - add', payload: data});

        }catch(e){
            console.log(e)
        }

    }

    const UpdateEntry = async( entry: Entry ) => {
        try{
            const { data } = await entriesApi.put<Entry>(`/entries/${ entry._id }`, entry)
            dispatch({ type:'[Entry] - update', payload: data })
        }catch(e){
            console.log(e)
        }
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