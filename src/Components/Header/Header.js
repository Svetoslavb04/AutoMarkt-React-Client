import './Header.scss'
import React from 'react';
import { Box } from '@mui/material'
import NavbarDesktop from './NavbarDesktop/NavbarDesktop';
import NavbarMobile from './NavbarMobile/NavbarMobile';

function Header() {
    React.useEffect(() => {

    }, []);

    return (
        <>
            <Box sx={{ display: { sm: 'block', md: 'none'}}}>
                <NavbarMobile />
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block', lg: 'block', xl: 'block' } }}>
                <NavbarDesktop/>
            </Box>
        </>
    );
}

export default Header;