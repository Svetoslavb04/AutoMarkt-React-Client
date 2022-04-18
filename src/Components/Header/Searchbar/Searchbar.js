import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField } from '@mui/material';

export default function Searchbar() {
    return (
        <TextField placeholder="Search"
            size='small'
            color='primary'
            placeholder="Search"
            variant='outlined'
            sx={{ width: '55ch' }}
            InputProps={{
                style: { fontSize: '1.2rem' },
                endAdornment: (<InputAdornment position="end">
                    <IconButton
                        aria-label="search"
                        edge="end"
                    >
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>)
            }} />
)}