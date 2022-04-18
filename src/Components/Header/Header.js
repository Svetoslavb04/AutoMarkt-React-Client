import './Header.scss'
import React from 'react';
import { Box } from '@mui/material'
import UpperHeaderSearchBar from './UpperHeaderSearchBar/UpperHeaderSearchBar.js';
import NavbarBigScreen from './Navbars/NavbarBigScreen';

function Header() {
    React.useEffect(() => {

    }, []);

    return (
        <>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <UpperHeaderSearchBar />
                <NavbarBigScreen />
            </Box>
        </>
    );
}

export default Header;