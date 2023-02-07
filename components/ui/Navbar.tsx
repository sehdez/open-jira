import { useContext } from 'react';
import NextLink from 'next/link';
import { AppBar, Toolbar, IconButton, Typography, Link as MaterialLink } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '@/context/ui';

export const Navbar = ( ) => {
    const { openSideMenu } = useContext(UIContext);
    return (
        // La elevation en 0 es para quitar la sombra
        <AppBar position='sticky' >
            <Toolbar>
                <IconButton
                    size='large'
                    edge = 'start'
                    onClick={openSideMenu }
                >
                    <MenuOutlinedIcon />
                </IconButton>

                <NextLink href='/' passHref legacyBehavior>
                    <MaterialLink underline='none' color='white'>
                        <Typography variant='h6'>Openjira</Typography>
                    </MaterialLink>
                </NextLink>
            </Toolbar>

        </AppBar>
    )
}

