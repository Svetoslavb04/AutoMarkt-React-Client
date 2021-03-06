import './NotFound.scss';

import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useLoadingContext } from '../../contexts/LoadingContext';

import { Typography, Button } from '../../mui-imports';

import CommonPage from '../CommonPage/CommonPage';

export default function NotFound() {

    const { setIsLoading } = useLoadingContext();

    useEffect(() => setIsLoading(false), [setIsLoading]);

    return (
        <CommonPage>
            <div className="not-found-heading-wrapper">
                <Typography variant='h2' className="not-found-heading-text">Oops! Error 404</Typography>
                <Typography variant='h4' className="not-found-heading-text">Page Not Found</Typography>
                <Link to='/' className='navigation-link-element'>
                    <Button variant='contained'>GO TO HOME PAGE</Button>
                </Link>
            </div>
        </CommonPage>
    )
}
