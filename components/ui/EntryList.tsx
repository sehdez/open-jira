import { List, Paper } from "@mui/material"
import { EntryCard } from "./EntryCard"
import { EntryStatus } from '../../interfaces/entry';
import { FC, PropsWithChildren, useContext, useMemo } from 'react';
import { EntriesContext } from "@/context/entries";

interface Props extends PropsWithChildren {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({status}) => {
    const { entries } = useContext(EntriesContext);
    const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ) , [entries] ) 
    
    return (
        // Aqui haremos Drop
        <div>
            <Paper sx={{ height: status==='pending'? 'calc(100vh - 210px)' : 'calc(100vh - 160px)', overflow:'auto', backgroundColor:'transparent', padding:1 }}>
                    {/* Cambiara dependiendo si estoy haciendo drag o no */}
                <List sx={{ opacity:1 }}>
                    {
                        entriesByStatus.map((entry, index) => (
                            <EntryCard key={entry._id} entry={entry} />
                            
                        ))
                    }
                </List>

            </Paper>
        </div>
    )
}
