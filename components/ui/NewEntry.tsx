import { ChangeEvent, useState, useContext, FC } from 'react';
import { Box, Button, TextField } from '@mui/material'
import { SaveOutlined, AddCircleOutline } from '@mui/icons-material'
import { EntriesContext } from '../../context/entries';
import { UIContext } from '@/context/ui';

interface Props{
    invisible?: boolean;
}

export const NewEntry: FC<Props> = ({ invisible = false }) => {
    const { addNewEntry } = useContext(EntriesContext);
    const { isAddingEntry, toggleAddingEntry } = useContext(UIContext);
    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const onTextFieldChanged = (e: ChangeEvent<HTMLInputElement> ) => {
        setTouched(true)
        setInputValue(e.target.value);
    }

    const onSave = () => {
        if (inputValue.length === 0) return;

        addNewEntry(inputValue)
        setInputValue('');
        setTouched(false);
        toggleAddingEntry(false);
    }

    return (
        <Box
            sx={{ marginBottom:2,paddingX:1, opacity: invisible ? 0 : 1 }}
        >

            {
                isAddingEntry 
                    ?(
                        <>
                            <TextField
                                fullWidth
                                sx={{ marginTop:2, marginBottom:1 }}
                                placeholder='Nueva entrada'
                                autoFocus
                                multiline
                                label='Nueva Entrada'
                                helperText={ touched && inputValue.length < 1 ? 'Ingrese un valor' : ''}
                                value={inputValue}
                                onChange={onTextFieldChanged}
                                error={ touched && inputValue.length < 1 }
                                onBlur={() => setTouched(true) }
                            />
                        
                            <Box display='flex' justifyContent='space-between' >
                                <Button
                                    variant='outlined'
                                    color='error'
                                    endIcon={<SaveOutlined />}
                                    onClick={ () => toggleAddingEntry(false) }

                                >
                                    Cancelar
                                </Button>
                                <Button
                                    variant='outlined'
                                    color='primary'
                                    endIcon={<SaveOutlined />}
                                    onClick={ onSave }
                                >
                                    Guardar
                                </Button>
                            </Box>
                        </>
                    )
                    :(
                        <Button
                            startIcon={ <AddCircleOutline /> }
                            fullWidth
                            variant='outlined'
                            onClick={ () => toggleAddingEntry(true) }
                        >
                            Agregar Tarea
                        </Button>
                    )
            }

            
        </Box>   
    )
}
