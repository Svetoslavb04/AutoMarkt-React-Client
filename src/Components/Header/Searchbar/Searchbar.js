import { useState } from 'react';
import { IconButton, InputAdornment, TextField, SearchIcon } from '../../../mui-imports.js';

export default function Searchbar(props) {

    const [value, setValue] = useState();

    const handleChange = (e) => setValue(e.target.value);

    const handleKeyDown = (e) => {
        if (e.keyCode == 13) {
            props.onSubmit(value);
        }
    }

    const handleIconClick = () => props.onSubmit(value);

    return (
        <TextField
            onChange={handleChange}
            onKeyDown={handleKeyDown}
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
                        onClick={handleIconClick}
                    >
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>)
            }} />
    )
}