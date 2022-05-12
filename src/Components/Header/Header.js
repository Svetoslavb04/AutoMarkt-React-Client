import { Box } from '../../mui-imports.js';

import NavbarDesktop from './NavbarDesktop/NavbarDesktop';
import NavbarMobile from './NavbarMobile/NavbarMobile';

import './Header.scss';

function Header() {

    return (
        <>
            <Box sx={{ display: { sm: 'block', md: 'none' } }}>
                <NavbarMobile />
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block', lg: 'block', xl: 'block' } }}>
                <NavbarDesktop />
            </Box>
        </>
    );

}

export default Header;