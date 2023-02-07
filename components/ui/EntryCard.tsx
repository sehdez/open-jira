import { useRouter } from 'next/router';
import { DragEvent, FC, useContext } from 'react';
import { UIContext } from '@/context/ui';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces/entry';
import { dateFunctions } from '@/utils';

interface Props {
    entry: Entry
}
export const EntryCard: FC<Props> = ({ entry }) => {
    const router = useRouter();
    const { startDragging, endDragging } = useContext(UIContext);

    const onDragStart = ( event: DragEvent ) => {
        startDragging();
        event.dataTransfer.setData('Text', entry._id);
    }
    const onDragEnd = () => {
        endDragging();
    }

    const onClick = () => {
        router.push(`/entries/${ entry._id }`)
    }

    return (
        <Card
            sx={{ marginBottom: 1 }}
            // Eventos del drag
            draggable={ true }
            onDragStart={ onDragStart }
            onDragEnd={ onDragEnd }
            onClick={ onClick }
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace:'pre-line' }} >{ entry.description }</Typography>
                </CardContent>

                <CardActions sx={{ display:'flex', justifyContent:'end', paddingRight:2 }}>
                    <Typography variant='body2' >{ dateFunctions.getFromatDistanceToNow(entry.createdAt) }</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
};
