import { Box, AppBar, Button, Toolbar, StyledEngineProvider, styled } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CategoriesPaper from '../CategoriesPaper/CategoriesPaper'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import './LowerNavbarLargeScreen.scss'

const NavLink = styled(Button)(({ theme }) => ({
    maxWidth: '100%',
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
    },
    minWidth: '0',
    fontSize: '1.2rem',
    color: 'white'
}));

export default function NavbarBigScreen() {

    return (
        <StyledEngineProvider injectFirst>
            {<Box>
                <AppBar className='header-navbar-appbar' color='primary'>
                    <Toolbar className='header-navbar-toolbar-desktop'>
                        <Box sx={{ ml: '9vw', display: 'inline-block', boxSizing: 'content-box' }}>
                            <Box className='header-all-categories-text-box' backgroundColor='secondary.dark'>
                                <MenuOpenIcon className='header-all-categories-text-icon' />
                                <Button
                                    className='header-all-categories-button'
                                    variant='text'
                                    color='white'
                                    sx={{
                                        "&.MuiButtonBase-root:hover": {
                                            bgcolor: "transparent"
                                        }
                                    }}
                                    disableRipple={true}
                                    disableFocusRipple={true}
                                    disableTouchRipple={true}
                                >
                                    All Categories
                                </Button>
                            </Box>
                            <CategoriesPaper categories={['Ktm', 'Beta', 'GasGas']} categoryFontSize='h6' categoryFontColor='white'/>
                        </Box>
                        <Box>
                            <NavLink variant='text' sx={{ ml: '20px' }}>Home</NavLink>
                        </Box>
                        <Box sx={{ maxWidth: '100%' }}>
                            <NavLink>Blog</NavLink>
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                            <NavLink>Order History</NavLink>
                        </Box>
                        <Box>
                            <NavLink>Become a seller</NavLink>
                        </Box>
                        <Box>
                            <NavLink><FavoriteIcon /></NavLink>
                        </Box>
                        <Box>
                            <NavLink><ShoppingCartIcon /></NavLink>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>}
        </StyledEngineProvider>
    )
}