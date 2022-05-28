import './OrderHistory.scss';

import { useEffect, useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';

import { useLoadingContext } from '../../../contexts/LoadingContext';

import { Typography } from '../../../mui-imports';

import CommonPage from '../../CommonPage/CommonPage';

import { getOrdersByUser } from '../../../services/orderService';

export default function OrderHistory() {

    const navigate = useNavigate();

    const { setIsLoading } = useLoadingContext();

    const [orders, setOrders] = useState();

    useEffect(() => {

        getOrdersByUser()
            .then(orders => setOrders(orders))
            .catch(err => navigate('/', { replace: true }));

    }, [navigate]);

    useEffect(() => {

        if (orders) {
            setIsLoading(false);
        }

    }, [setIsLoading, orders]);

    return (
        <CommonPage breadcrumbs={['Home', 'Order History']}>
            <Typography variant='h3' component='h1' className='order-history-header-text'>
                Order History
            </Typography>
            <table className='order-history-table'>
                <thead>
                    <tr>
                        <th><Typography>Order</Typography></th>
                        <th><Typography>Date</Typography></th>
                        <th><Typography>Status</Typography></th>
                        <th><Typography>Total</Typography></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders && orders.length > 0
                            ? orders.map(o => {
                                const createdAt = new Date(o.postedOn);

                                const monthNameLong = createdAt.toLocaleString("en-US", { month: "long" });

                                const createdAtString = `${createdAt.getDate()} ${monthNameLong}, ${createdAt.getFullYear()}`;

                                return (
                                    <tr key={o._id}>
                                        <td>
                                            <Typography className='order-history-mobile-text'>Order Number:</Typography>
                                            <Link to={`/order-history/${o._id}`} className='navigation-link-element'>
                                                <Typography color='primary'>#{o.number}</Typography>
                                            </Link>
                                        </td>
                                        <td>
                                            <Typography className='order-history-mobile-text'>Date:</Typography>
                                            <Typography>{createdAtString}</Typography>
                                        </td>
                                        <td>
                                            <Typography className='order-history-mobile-text'>Status:</Typography>
                                            <Typography>Completed</Typography>
                                        </td>
                                        <td>
                                            <Typography className='order-history-mobile-text'>Total:</Typography>
                                            <Typography>€{o.total}</Typography>
                                        </td>
                                    </tr>
                                )
                            })
                            : <></>
                    }
                </tbody>
            </table>
        </CommonPage >
    )
}
