import { useState } from 'react';
import { Collapse } from '../../mui-imports.js';


export default function Dropdown(props) {

    const [isOpened, setIsOpened] = useState(false);

    const toggleDropdown = (value) => setIsOpened(value);

    return (
        <>
            <div
                className={props.dropdownToggleElementClassName}
                onClick={toggleDropdown.bind(null, !isOpened)}

            >
                {props.toggleElement}
            </div>
            <Collapse in={isOpened}>
                {props.children}
            </Collapse>

        </>
    );
}
