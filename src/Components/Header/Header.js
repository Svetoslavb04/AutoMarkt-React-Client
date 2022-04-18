import './Header.scss'
import React from 'react';
import UpperHeaderSearchBar from '../UpperHeaderSearchBar/UpperHeaderSearchBar.js';
import {Box} from '@mui/material'

function Header() {
    React.useEffect(() => {

    }, []);

    return (
        <>
        <Box sx={{display: { xs: 'none', md:'block'}}}>
            <UpperHeaderSearchBar xs/>
        </Box>
        </>
    );
}

export default Header;