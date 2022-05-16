import { useEffect } from 'react';

import { useLoadingContext } from '../../contexts/LoadingContext';

import { CircularProgress } from '../../mui-imports';

import Breadcrumbs from '../../Components/Breadcrumbs/Breadcrumbs.js';

import './CommonPage.scss';

export default function CommonPage(props) {

    const { isLoading, setIsLoading } = useLoadingContext();

    useEffect(() => {

        setIsLoading(false);

        return () => {
            setIsLoading(true);
        }
        
    }, []);

    return (
        <div className="common-page-wrapper">
            <Breadcrumbs items={props.breadcrumbs} />
            {
                isLoading
                    ? <CircularProgress color='primary' className='circular-progress' />
                    : props.children
            }
        </div>
    )
}