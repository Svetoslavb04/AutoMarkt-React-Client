import { Box, AppBar, Button, Toolbar, StyledEngineProvider, Typography, styled, Container } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Searchbar from '../Searchbar/Searchbar';
import NavigationDrawer from './NavigationDrawer/NavigationDrawer'
import SearchDrawer from './SearchDrawer/SearchDrawer'
import * as React from 'react'

const NavLink = styled(Button)(({ theme }) => ({
    maxWidth: '100%',
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
    },
    minWidth: '0',
    fontSize: '1.2rem',
    color: 'white'
}));

const ResponsiveLogoTypo = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down('tablet')]: {
        flexGrow: 1,
        textAlign: 'start',
        fontSize: '2.4rem'
    },
}));

export default function NavbarMobile() {

    const [isNavigationOpened, setNavigationIsOpened] = React.useState({
        left: false
    });

    const toggleDrawer = (open) => () => setNavigationIsOpened({ left: open });

    const [isSearchOpened, setisSearchOpened] = React.useState({
        top: false,
    });

    const toggleSearchbar = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setisSearchOpened({ top: open });
    };

    return (
        <>
            <StyledEngineProvider injectFirst>
                {<Box>
                    <AppBar className='header-navbar-appbar' color='primary'>
                        <Container>
                            <Toolbar className='header-navbar-toolbar-mobile'>
                                <Box>
                                    <Button color='white' onClick={toggleDrawer(true)}><MenuIcon fontSize='large' /></Button>
                                    <NavigationDrawer isOpened={isNavigationOpened} toggleDrawer={toggleDrawer} />
                                </Box>
                                <ResponsiveLogoTypo variant="h3" component="h1" align='center' fontFamily={'Lora'} fontWeight={600}>
                                    eLaden
                                </ResponsiveLogoTypo>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        textAlign: 'center',
                                        display: { xs: 'none', tablet: 'block', md: 'none' },
                                    }}>
                                    <Searchbar color='dark' sx={{ width: '55vw' }} />
                                </Box>
                                <Box
                                    sx={{
                                        display: { sm: 'block', tablet: 'none', md: 'none' }
                                    }}
                                >
                                    <NavLink onClick={toggleSearchbar(true)}>
                                        <SearchIcon />
                                    </NavLink>
                                    <SearchDrawer isOpened={isSearchOpened} toggleSearchbar={toggleSearchbar} />
                                </Box>
                                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                    <NavLink><FavoriteIcon /></NavLink>
                                </Box>
                                <Box>
                                    <NavLink><ShoppingCartIcon /></NavLink>
                                </Box>
                            </Toolbar>
                        </Container>
                    </AppBar>
                </Box>}
            </StyledEngineProvider>
        </>
    );
}