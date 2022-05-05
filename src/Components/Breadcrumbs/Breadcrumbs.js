import { Link } from 'react-router-dom';

import { Breadcrumbs, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import './Breadcrumbs.scss';

export default function CustomBreadcrumbs(props) {
    let items = [];

    props.items.forEach((item, i) => {
        
        let isLast = false;

        if (i == props.items.length - 1) {
            isLast = true;
        }

        const path = `/${item.toLowerCase().split(' ').join('-') == 'home'
            ? ''
            : item.toLowerCase().split(' ').join('-')}`;

        items.push(
            <Link
                to={path}
                className={`navigation-link-element breadcrumb-item ${isLast ? 'breadcrumb-item-last' : ' '}`}
                key={item}
            >
                {item}
            </Link>
        );
    })

    return (
        <Box className='breadcrumbs-wrapper'>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                {items}
            </Breadcrumbs>
        </Box>
    )
}