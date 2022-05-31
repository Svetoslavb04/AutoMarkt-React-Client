import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useWishListContext } from '../../../contexts/WishListContext';
import { useShoppingCartContext } from '../../../contexts/ShoppingCartContext';

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

    const navigate = useNavigate();
    
    const { wishListItemsCount } = useWishListContext();
    const { shoppingCartItemsCount } = useShoppingCartContext();

    const [isNavigationOpened, setNavigationIsOpened] = useState(false);

    const toggleDrawer = (open) => () => setNavigationIsOpened(open);

    const [isSearchOpened, setisSearchOpened] = useState({
        top: false,
    });

    const location = useLocation();

    useEffect(() => {

        setNavigationIsOpened(false);
        setisSearchOpened(false);

    }, [location]);

    const toggleSearchbar = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setisSearchOpened({ top: open });
    };

    const handleSubmitSearch = (value) => navigate(`/catalog?search=${value}`, { replace: true });

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
                            <Typography className='logo-dashes' variant="body1" component="h1" color='black'>
                                {'//'}
                            </Typography>
                            <Typography className='logo-text' variant="body1" component="h1">
                                AutoMarkt
                            </Typography>
                        </Link>
                        <Box
                            sx={{
                                flexGrow: 1,
                                textAlign: 'center',
                                display: { xs: 'none', tablet: 'block', md: 'none' },
                            }}>
                            <Searchbar color='dark' onSubmit={handleSubmitSearch}/>
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
                                <NavButton>
                                    <FavoriteIcon />
                                    <span className='header-indicator'>{wishListItemsCount}</span>
                                </NavButton>
                            </Link>
                        </Box>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Link to='/shopping-cart' className='navigation-link-element'>
                                <NavButton>
                                    <ShoppingCartIcon />
                                    <span className='header-indicator'>{shoppingCartItemsCount}</span>
                                </NavButton>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}