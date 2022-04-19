import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Paper, MenuList, MenuItem, ListItemText, Box, Typography, Button } from '@mui/material';
import './CategoriesList.scss'

export default function CategoriesList() {
    return (
        <>
            <Box className='header-all-categories-item' backgroundColor='secondary.dark'>
                <MenuOpenIcon className='header-openIcon-all-categories' />
                <Button color='white' sx={{
                    fontSize: '1.2rem',
                    display: 'inline-block'
                }}>
                    All Categories
                </Button>
            </Box>
            <Box sx={{ width: '200px', display: 'block', position: 'absolute', top: '40px' }}>
                <Paper sx={{ width: 320, maxWidth: '100%', backgroundColor: 'secondary.dark' }}>
                    <MenuList>
                        <MenuItem>
                            <ListItemText primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Cut</Typography>} />
                        </MenuItem>
                        <MenuItem>
                            <ListItemText primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Cut</Typography>} />
                        </MenuItem>
                    </MenuList>
                </Paper>
            </Box>
        </>
    );
}