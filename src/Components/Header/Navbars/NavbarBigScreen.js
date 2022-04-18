import { Box, AppBar, Button } from '@mui/material'
import CategoriesList from '../CategoriesList/CategoriesList'

export default function NavbarBigScreen() {
    return (
        <Box sx={{ backgroundColor: 'primary' }} alignItems={'center'}>
            <AppBar sx={{ m: '0px', py: '7px', display: 'flex', flexDirection: 'row', textAlign: 'start', alignItems: 'center' }} position='relative' color='primary'>
                <Box sx={{ ml: '100px', display: 'inline-block' }}>
                    <CategoriesList></CategoriesList>
                </Box>
                <Box sx={{ display: 'inline-block' }}>
                    <Button color='white' sx={{ ml: '10px', fontSize: '1.2rem', display: 'block' }}>Home</Button>
                </Box>
                <Box sx={{ display: 'inline-block' }}>
                    <Button color='white' sx={{ fontSize: '1.2rem', display: 'block' }}>Sale</Button>
                </Box>
            </AppBar>
        </Box>
    )
}