import { List, Paper } from "@mui/material"
import { EntryCard } from "./EntryCard"
import { EntryStatus, Entry } from '../../interfaces/entry';
import { DragEvent, FC, PropsWithChildren, useContext, useMemo } from 'react';
import { EntriesContext } from "@/context/entries";
import { UIContext } from '../../context/ui/UIContext';

import styles from './EntryList.module.css';

interface Props extends PropsWithChildren {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({status}) => {
    const { entries, UpdateEntry } = useContext(EntriesContext);
    const { isDragging, endDragging } = useContext(UIContext);

    const entriesByStatus = useMemo( () => entries?.filter( entry => entry.status === status ) , [entries] ) 

    const onDropEntry = ( event: DragEvent<HTMLDivElement> ) => {
        const id = event.dataTransfer.getData('text');
        const entry = entries.find(entry => entry._id === id)!;
        UpdateEntry({...entry, status});
        endDragging()
    }

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }
    return (
        // Aqui haremos Drop
        <div
            onDrop={ onDropEntry }
            onDragOver={ allowDrop }
            className={ isDragging ? styles.dragging : '' }
        >
            <Paper sx={{ height: status==='pending'? 'calc(100vh - 210px)' : 'calc(100vh - 160px)', overflow:'auto', backgroundColor:'transparent', padding:1 }}>
                    {/* Cambiara dependiendo si estoy haciendo drag o no */}
                <List sx={{  opacity: isDragging ? 0.3 : 1, transition:'all .3s' }}>
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
