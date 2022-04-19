import { Box, AppBar, Button } from '@mui/material'
import CategoriesList from '../CategoriesList/CategoriesList'
import './NavbarBigScreen.scss'

export default function NavbarBigScreen() {
    return (
        <Box sx={{ backgroundColor: 'primary', boxSizing: 'content-box' }} alignItems={'center'}>
            <AppBar sx={{
                m: '0px',
                py: '7px',
                display: 'flex',
                flexDirection: 'row',
                textAlign: 'start',
                alignItems: 'center',
                position: 'relative',
                boxSizing: 'content-box'
            }}
                color='primary'>
                <Box sx={{ ml: '100px', display: 'inline-block', boxSizing: 'content-box' }}>
                    <CategoriesList />
                </Box>
                <Box sx={{ display: 'inline-block' }}>
                    <Button color='white' sx={{ ml: '20px', fontSize: '1.2rem', display: 'block' }}>Home</Button>
                </Box>
                <Box sx={{ display: 'inline-block' }}>
                    <Button color='white' sx={{ fontSize: '1.2rem', display: 'block' }}>Sale</Button>
                </Box>
            </AppBar>
        </Box>
    )
}