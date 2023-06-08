
import { NextPage } from 'next';
import { Layout } from '@/components/layout';
import { Typography, Grid, Card, CardHeader, CardContent } from '@mui/material';
import { EntryList } from '@/components/ui';
import { NewEntry } from '../components/ui/NewEntry';

const  HomePage: NextPage = () => {
    return (
        <Layout title='Home | Openjira'>
            <Grid container spacing={2} justifyContent='center' >
                
                <Grid item xs={12} md={6} lg={4} >
                    <Card sx={{ height: 'calc(100vh - 100px)' }}>
                        <CardHeader title='Pendientes' />
                        <NewEntry/>
                        <EntryList status='pending'/>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={4} >
                    <Card sx={{ height: 'calc(100vh - 100px)' }}>
                        <CardHeader title='En Proceso' />
                        <NewEntry invisible />
                        <EntryList status='in-progress'/>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={4} >
                    <Card sx={{ height: 'calc(100vh - 100px)' }}>
                        <CardHeader title='Completadas' />
                        <NewEntry invisible />
                        <EntryList status='finished'/>
                    </Card>
                </Grid>
            </Grid> 
                   
        </Layout>
    )
};


export default HomePage;
