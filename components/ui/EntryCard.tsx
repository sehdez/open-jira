import { UIContext } from '@/context/ui';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { DragEvent, FC, useContext } from 'react';
import { Entry } from '../../interfaces/entry';

interface Props {
    entry: Entry
}
export const EntryCard: FC<Props> = ({ entry }) => {

    const { startDragging, endDragging } = useContext(UIContext);

    const onDragStart = ( event: DragEvent ) => {
        startDragging();
        event.dataTransfer.setData('Text', entry._id);
    }
    const onDragEnd = () => {
        endDragging();
    }
    return (
        <Card
            sx={{ marginBottom: 1 }}
            // Eventos del drag
            draggable={ true }
            onDragStart={ onDragStart }
            onDragEnd={ onDragEnd }
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace:'pre-line' }} >{ entry.description }</Typography>
                </CardContent>

                <CardActions sx={{ display:'flex', justifyContent:'end', paddingRight:2 }}>
                    <Typography variant='body2' >hace 30 min</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
};
