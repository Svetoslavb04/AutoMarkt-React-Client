import { useState } from "react";

import { Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function SelectDropdown(props) {

    const [anchorEl, setAnchorEl] = useState(null);

    const [selected, setSelected] = useState(props.items[0]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const isOpen = Boolean(anchorEl);

    const handleMenuItemClick = (index) => {

        setSelected(props.items[index]);
        setSelectedIndex(index);

        props.onChange(props.items[index]);

        setAnchorEl(null);
    };

    return (
        <div className={props.dropdownWrapperClassName}>
            <Button
                className={props.openButtonClassName}
                onClick={(e) => setAnchorEl(e.currentTarget)}
                variant="outlined"
                size={props.openButtonSize}
            >
                {selected}
                <KeyboardArrowDownIcon
                    className={`dynamic-arrow ${isOpen ? 'rotated' : 'closed'}`}
                />
            </Button>
            <Menu
                className={props.menuClassName}
                anchorEl={anchorEl}
                open={isOpen}
                onClose={() => setAnchorEl(null)}
            >
                {props.items.map((item, index) => (
                    <MenuItem
                        className={props.menuItemClassName}
                        key={item}
                        selected={index === selectedIndex}
                        onClick={() => handleMenuItemClick(index)}
                    >
                        {item}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}