import { Link } from 'react-router-dom';

import { Breadcrumbs, NavigateNextIcon } from '../../mui-imports'

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
                onClick={isLast ? (e) => e.preventDefault() : (e) => e}
                className={`breadcrumb-item ${isLast ? 'breadcrumb-item-last' : ' '} navigation-link-element`}
                key={item}
            >
                {item}
            </Link>
        );
    })

    return (
        <div className='breadcrumbs-wrapper'>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                {items}
            </Breadcrumbs>
        </div>
    )
}