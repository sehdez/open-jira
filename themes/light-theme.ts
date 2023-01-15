import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors'

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background:{
            default: '#f2f2f2f2'
        },
        primary: {
            main: '#4a148c'
        },
        secondary: {
            main: '#19857b'
        },
        error: {
            main: red.A400
        }
    },
    components: {
        MuiAppBar:{
            // La elevation en 0 es para quitar la sombra
            defaultProps:{
                elevation: 0
            }
        }
    }
});