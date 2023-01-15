import { useContext } from 'react';

import { Box, Drawer, List, Typography, ListItem, Divider, ListItemText } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';

import { InboxOutlined, MailOutline } from '@mui/icons-material';
import { UIContext } from '@/context/ui';

const menuItems = ['Inbox', 'Starred', 'Send Email', 'Drafts' ];

export const Sidebar = () => {
    const { sideMenuOpen, closeSideMenu } = useContext( UIContext );
    return (
        <Drawer
            anchor='left'
            open={ sideMenuOpen }
            onClose={ closeSideMenu }
        >
            <Box sx={{ width:250 }}>
                <Box sx={{ padding:'5px 10px' }} >
                    <Typography variant='h4' >Menú</Typography>
                </Box>
                {
                    menuItems.map((text)=> (
                        <List key={text+'123'}>
                            {
                                menuItems.map(( item, index ) => (
                                    <ListItem button key={ item+index } >
                                        <ListItemIcon>
                                            { index % 2 ? <InboxOutlined/> : <MailOutline/> }
                                        </ListItemIcon>
                                        <ListItemText primary={ item } />
                                    </ListItem>
                                ))
                            }
                            <Divider/>
                        </List>
                    ))
                }
            </Box>
        </Drawer>
    );
}