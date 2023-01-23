import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { EntriesProvider } from '../context/entries';
import { UIProvider } from '@/context/ui';

import { darkTheme, lightTheme } from '@/themes';



export default function App({ Component, pageProps }: AppProps) {
    return(
        <EntriesProvider>
            <UIProvider>
                <ThemeProvider theme={ lightTheme } >
                    <CssBaseline/>
                    <Component {...pageProps} />
                </ThemeProvider> 
            </UIProvider>
        </EntriesProvider>
    );
}
