import React, { FC, useState } from 'react'
import { Box } from '@mui/material'
import Head from 'next/head'
import { Navbar, Sidebar } from '../ui';

interface Props {
    title?: string;
    children: any;
}
export const Layout: FC<Props> = ({ title = 'OpenJira', children }) => {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    return (
        <Box sx={{
            flexFlow:1 // para que se extienda lo mas que se pueda
        }}>
            <Head>
                <title>{ title }</title>
            </Head>
            <Navbar/>
            <Sidebar/>
            <Box sx={{ padding:'10px 20px' }}>
                { children }
            </Box>
        </Box>   
    )
}

