import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface ContextProps{
   entries: Entry [];
   addNewEntry: ( description: string ) => void;
   UpdateEntry: (entry : Entry) => void;
}

export const EntriesContext = createContext({} as ContextProps);