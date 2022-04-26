import * as React from 'react';
import { Box, Drawer } from '@mui/material';
import Searchbar from '../../Searchbar/Searchbar'

export default function SearchDrawer(props) {

    const list = () => (
        <Box
            role="presentation"
            sx={{
                width: '100%'
            }}
        >
            <Searchbar sx={{ width: '100%' }} />
        </Box >
    );

    return (
        <React.Fragment key='top'>
            <Drawer
                anchor='top'
                open={props.isOpened['top']}
                onClose={props.toggleSearchbar(false)}
                sx={{
                    '&': {
                        flexDirection: 'row'
                    }
                }}
            >
                {list()}
            </Drawer>
        </React.Fragment>
    );
}
