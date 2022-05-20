import { useEffect } from 'react';

import { useLoadingContext } from '../../contexts/LoadingContext';

import { CircularProgress } from '../../mui-imports';

import Breadcrumbs from '../../Components/Breadcrumbs/Breadcrumbs.js';

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

import './CommonPage.scss';

export default function CommonPage(props) {

    const { isLoading, setIsLoading } = useLoadingContext();

    useEffect(() => {

        return () => setIsLoading(true)

    }, []);

    return (
        isLoading
            ? <div className="common-page-loading-wrapper">
                <CircularProgress color='primary' className='common-page-loading-svg' />
            </div>
            : <>
                <Header />
                <div className={`common-page-wrapper${props.wrapperClassName || ''}`}>
                    {
                        props.breadcrumbs.length > 0
                            ? <Breadcrumbs items={props.breadcrumbs} />
                            : <></>
                    }
                    {
                        isLoading
                            ? <CircularProgress color='primary' className='circular-progress' />
                            : props.children
                    }
                </div>
                <Footer />
            </>
    )
}