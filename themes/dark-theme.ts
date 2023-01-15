import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        secondary: {
            main: '#19857b'
        },
        error: {
            main: red.A400
        }
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                // La elevation en 0 es para quitar la sombra
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundColor: '#4a1480'
                },
            }
        }
    }
});