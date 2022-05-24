import { useState } from "react";

import { Button, Menu, MenuItem, KeyboardArrowDownIcon } from "../../mui-imports.js";


export default function SelectDropdown(props) {

    const [anchorEl, setAnchorEl] = useState(null);

    const [selected, setSelected] = useState(props.defaultSelected);
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
                    className=
                    {`dynamic-arrow ${isOpen ? 'rotated' : 'closed'} ${props.openButtonArrowClassName ? props.openButtonArrowClassName : ''}`}
                />
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={() => setAnchorEl(null)}
                disableScrollLock={true}
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