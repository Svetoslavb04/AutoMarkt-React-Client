import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField} from '@mui/material';

export default function Searchbar(props) {
    return (
        <TextField
            size='small'
            color={props.color}
            placeholder="Search"
            variant='outlined'
            sx={props.sx}
            className={props.className}
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
    )
}