import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './SelectDropdown.scss';

export default function SelectDropdown(props) {
    const [state, setState] = React.useState(0);

    const items = [];

    props.items.forEach(item => {
        items.push(
            <MenuItem key={item[0]} value={Number(item[0])}>{item[1]}</MenuItem>
        );
    })

    const handleChange = (e) => {
        setState(e.target.value);
        props.onChange(e.target.value);
    };

    return (
        <div className='select-dropdown-wrapper'>
            <FormControl sx={{ minWidth: props.minWidth }} size={props.size}>
                <Select
                    className={props.className}
                    value={state}
                    onChange={handleChange}
                    displayEmpty
                >
                    {items}
                </Select>
            </FormControl>
        </div>
    );
}
