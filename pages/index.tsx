
import { Layout } from '@/components/layout';
import { Typography } from '@mui/material';
import { NextPage } from 'next';

const  HomePage: NextPage = () => {
    return (
        <Layout title='Hola Mundo'>
            <Typography variant='h1' color={'primary'} >Hola Mundo</Typography>
        </Layout>
    )
};


export default HomePage;
