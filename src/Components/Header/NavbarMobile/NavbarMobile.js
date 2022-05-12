import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
    Box, AppBar, Button, Toolbar, Typography, styled, Container, SearchIcon, FavoriteIcon, ShoppingCartIcon, MenuIcon
} from '../../../mui-imports.js';


import Searchbar from '../Searchbar/Searchbar';
import NavigationDrawer from './NavigationDrawer/NavigationDrawer'
import SearchDrawer from './SearchDrawer/SearchDrawer'

import './NavbarMobile.scss';

const NavButton = styled(Button)(({ theme }) => ({
    maxWidth: '100%',
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
    },
    minWidth: '0',
    fontSize: '1.2rem',
    color: 'white'
}));

export default function NavbarMobile() {

    const [isNavigationOpened, setNavigationIsOpened] = useState(false);

    const toggleDrawer = (open) => () => setNavigationIsOpened(open);

    const [isSearchOpened, setisSearchOpened] = useState({
        top: false,
    });

    const toggleSearchbar = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setisSearchOpened({ top: open });
    };

    const location = useLocation();

    useEffect(() => {

        setNavigationIsOpened(false);
        setisSearchOpened(false);

    }, [location]);

    return (
        <div>
            <AppBar className='header-navbar-appbar' color='primary'>
                <Container>
                    <Toolbar className='header-navbar-toolbar-mobile'>
                        <div>
                            <Button color='white' onClick={toggleDrawer(true)}><MenuIcon fontSize='large' /></Button>
                            <NavigationDrawer isOpened={isNavigationOpened} toggleDrawer={toggleDrawer} />
                        </div>
                        <Link to="/" className='navigation-link-element header-navbar-toolbar-logo logo-wrapper'>
                            <Typography className='logo-dashes' variant="body1" component="h1" fontFamily={'Montserrat'} color='black'>
                                //
                            </Typography>
                            <Typography className='logo-text' variant="body1" component="h1" fontFamily={'Montserrat'}>
                                AutoMarkt
                            </Typography>
                        </Link>
                        <Box
                            sx={{
                                flexGrow: 1,
                                textAlign: 'center',
                                display: { xs: 'none', tablet: 'block', md: 'none' },
                            }}>
                            <Searchbar color='dark' />
                        </Box>
                        <Box
                            className='header-navbar-toolbar-search-icon'
                            sx={{
                                display: { sm: 'block', tablet: 'none', md: 'none' }
                            }}
                        >
                            <NavButton onClick={toggleSearchbar(true)}>
                                <SearchIcon />
                            </NavButton>
                            <SearchDrawer isOpened={isSearchOpened} toggleSearchbar={toggleSearchbar} />
                        </Box>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Link to='/wish-list' className='navigation-link-element'>
                                <NavButton><FavoriteIcon /></NavButton>
                            </Link>
                        </Box>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Link to='/shopping-cart' className='navigation-link-element'>
                                <NavButton><ShoppingCartIcon /></NavButton>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}