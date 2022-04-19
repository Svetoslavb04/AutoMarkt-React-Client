import { Box, AppBar, Button, Toolbar, Container } from '@mui/material'
import { StyledEngineProvider, styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoriesList from '../CategoriesList/CategoriesList'
import FavoriteIcon from '@mui/icons-material/Favorite';
import './LowerNavbarLargeScreen.scss'

const NavLink = styled(Button)(({ theme }) => ({
    maxWidth: '100%',
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
    },
    minWidth: '0',
    fontSize: '1.2rem',
    color:'white'
}));

export default function NavbarBigScreen() {

    return (
        <StyledEngineProvider injectFirst>
            {<Box>
                <AppBar className='header-navbar-appbar' color='primary'>
                    <Toolbar className='header-navbar-toolbar'>
                        <Box sx={{ ml: '9vw', display: 'inline-block', boxSizing: 'content-box' }}>
                            <CategoriesList />
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
                            <NavLink>Logout</NavLink>
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