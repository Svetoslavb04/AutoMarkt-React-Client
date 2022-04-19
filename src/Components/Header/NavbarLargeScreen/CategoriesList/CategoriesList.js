import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Paper, MenuList, MenuItem, ListItemText, Box, Typography, Button } from '@mui/material';
import './CategoriesList.scss'

export default function CategoriesList() {
    return (
        <>
            <Box className='header-all-categories-text-box' backgroundColor='secondary.dark'>
                <MenuOpenIcon className='header-all-categories-text-icon' />
                <Button
                    className='header-all-categories-button'
                    variant='text'
                    color='white'
                    sx={{
                        fontSize: '1.2rem',
                        textTransform: 'none',
                        display: 'inline-block',
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
            <Box className='header-all-categories-list'>
                <Paper sx={{ backgroundColor: 'secondary.dark', boxShadow: 0 }}>
                    <MenuList>
                        <MenuItem>
                            <ListItemText primary={<Typography variant="h6" style={{ color: '#FFFFFF' }}>Cut apples</Typography>} />
                        </MenuItem>
                        <MenuItem>
                            <ListItemText primary={<Typography variant="h6" style={{ color: '#FFFFFF' }}>Cut apples</Typography>} />
                        </MenuItem>
                        <MenuItem>
                            <ListItemText primary={<Typography variant="h6" style={{ color: '#FFFFFF' }}>Cut apples</Typography>} />
                        </MenuItem>
                        <MenuItem>
                            <ListItemText primary={<Typography variant="h6" style={{ color: '#FFFFFF' }}>Cut apples</Typography>} />
                        </MenuItem>
                        <MenuItem>
                            <ListItemText primary={<Typography variant="h6" style={{ color: '#FFFFFF' }}>Cut apples</Typography>} />
                        </MenuItem>
                        <MenuItem>
                            <ListItemText primary={<Typography variant="h6" style={{ color: '#FFFFFF' }}>Cut apples</Typography>} />
                        </MenuItem>
                    </MenuList>
                </Paper>
            </Box>
        </>
    );
}