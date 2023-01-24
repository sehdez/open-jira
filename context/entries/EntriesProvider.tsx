import { FC, PropsWithChildren, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import { v4 as uuidv4 } from 'uuid';


export interface EntriesState{
    entries: Entry [];
}

const Entries_INITAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Pendientes: Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: 'En proceso: Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            status: 'in-progress',
            createdAt: Date.now() -100000
        },
        {
            _id: uuidv4(),
            description: 'Finalizada: Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            status: 'finished',
            createdAt: Date.now() -200000
        }
    ]
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