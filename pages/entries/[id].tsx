import { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next'

import { Layout } from '@/components/layout';
import { SaveOutlined, DeleteOutline } from '@mui/icons-material'
import { EntryStatus, Entry } from '../../interfaces/entry';
import { 
    Button, 
    capitalize,
    Card, 
    CardActions, 
    CardContent, 
    CardHeader, 
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    Grid, 
    IconButton, 
    Radio, 
    RadioGroup, 
    TextField 
} from '@mui/material';
import { dbEntries } from '@/database';
import entriesApi from '../../apis/entriesApi';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { dateFunctions } from '@/utils';



const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
    entry: Entry
}
const EntryPage: FC<Props> = ({ entry }) => {
    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);
    const { UpdateEntry } =useContext( EntriesContext )
    const onTextFieldChanged = (e: ChangeEvent<HTMLInputElement> ) => {
        
        setTouched(true)
        setInputValue(e.target.value);
    }

    const onStatusChanged = (e: ChangeEvent<HTMLInputElement>) => {
        
        setStatus( e.target.value.toLowerCase() as EntryStatus )
    }

    const isNotValidForm = useMemo(() => {
        return inputValue.trim().length <= 0 && touched;
    }, [inputValue, touched]);

    const onSave = async () => {
        try{
            if(inputValue.trim().length === 0 ) return
            const updateEntry: Entry = {
                ...entry,
                status,
                description: inputValue
            }
            UpdateEntry(updateEntry, true);
        }catch(e){
            console.log(e)
        }
    }

    return (
        <Layout title={ inputValue.substring(0,20) + ' ...' } >
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={ 12 } sm={ 8 } md={ 6 } xl={ 4 } >
                    <Card>
                        <CardHeader
                            title={ `Entrada: ${inputValue.substring(0,20) + ' ...'}` }
                            subheader={ `Creada ${dateFunctions.getFromatDistanceToNow(entry.createdAt)}` }
                        >
                        </CardHeader>
                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder='Nueva entrada'
                                autoFocus
                                multiline
                                label='Nueva entrada'
                                value={ inputValue }
                                onChange={onTextFieldChanged}
                                helperText={ isNotValidForm ? 'Ingrese un valor' : '' }
                                error={ isNotValidForm }
                                onBlur={ () => setTouched(true) }
                            ></TextField>
                            
                            <FormControl>
                                <FormLabel>Estado: </FormLabel>
                                <RadioGroup 
                                    row 
                                    value={ status }
                                    onChange= { onStatusChanged }    
                                >
                                    {
                                        validStatus.map( option  => (
                                            <FormControlLabel
                                                key={ option }
                                                value={ capitalize(option) }
                                                control={ <Radio/> }
                                                label={ capitalize(option) }
                                                checked={ option === status }
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>

                        </CardContent>
                        <CardActions>
                            <Button
                                startIcon={<SaveOutlined/>}
                                variant='contained'
                                fullWidth
                                disabled={ inputValue.trim().length <= 0 }
                                onClick={onSave}
                            >
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <IconButton sx={{
                position: 'fixed',
                bottom: 30,
                right: 30,
                backgroundColor: 'error.dark'
            }}
            >
                <DeleteOutline/>
            </IconButton>

        </Layout>
    )
}
export default EntryPage;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { id } = params as { id: string };

    const entry = await dbEntries.getEntryById(id);

    if ( !entry ){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}