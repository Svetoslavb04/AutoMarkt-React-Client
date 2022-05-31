import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Drawer } from '../../../../mui-imports.js';

import Searchbar from '../../Searchbar/Searchbar'

export default function SearchDrawer(props) {

    const navigate = useNavigate();

    const handleSubmitSearch = (value) => navigate(`/catalog?search=${value}`, { replace: true });

    return (
        <Fragment key='top'>
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
                <Box
                    role="presentation"
                    sx={{
                        width: '100%'
                    }}
                >
                    <Searchbar sx={{ width: '100%' }} onSubmit={handleSubmitSearch} />
                </Box >
            </Drawer>
        </Fragment>
    );
}
