import './Header.scss'
import React from 'react';
import { Box } from '@mui/material'
import NavbarLargeScreen from './NavbarLargeScreen/NavbarLargeScreen';

function Header() {
    React.useEffect(() => {

    }, []);

    return (
        <>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <NavbarLargeScreen/>
            </Box>
        </>
    );
}

export default Header;