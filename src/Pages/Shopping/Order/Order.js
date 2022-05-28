import './Order.scss';

import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import { useLoadingContext } from '../../../contexts/LoadingContext';
import { useNotificationContext, types } from '../../../contexts/NotificationContext';

import { Typography, Button } from '../../../mui-imports';

import CommonPage from '../../CommonPage/CommonPage';

import { getOrderById } from '../../../services/orderService';
import { getVehicles } from '../../../services/vehicleService';

export default function Order() {

    const { _id } = useParams();

    const { popNotification } = useNotificationContext();

    const navigate = useNavigate();

    const { setIsLoading } = useLoadingContext();

    const [order, setOrder] = useState();

    const [vehicles, setVehicles] = useState();

    useEffect(() => {

        getOrderById(_id)
            .then(order => {

                if (!order) {
                    throw Error;
                }

                setOrder(order);
            })
            .catch(err => {
                popNotification('Invalid Order!', types.error);
                return navigate('/', { replace: true });
            });

    }, [navigate, _id, popNotification]);

    useEffect(() => {

        if (order) {

            getVehicles(order.vehicles)
                .then(vehicles => setVehicles(vehicles))
                .catch(err => setVehicles([]));


        }

    }, [setIsLoading, order]);

    useEffect(() => {
        if (vehicles) {
            
            setIsLoading(false);

        }
    }, [vehicles, setIsLoading])

    const createdAt = new Date(order?.postedOn);

    const monthNameLong = createdAt.toLocaleString("en-US", { month: "long" });

    const createdAtString = `${createdAt.getDate()} ${monthNameLong}, ${createdAt.getFullYear()}`

    return (
        <CommonPage breadcrumbs={['Home', 'Order History', `Order: #${order?.number}`]}>
            <div className="order-order-wrapper">
                <div className="order-order-heading">
                    <Typography variant='h5'>Order #{order?.number}</Typography>
                    <Link to='/order-history' className='navigation-link-element'>
                        <Button>Back to order history</Button>
                    </Link>
                </div>
                <div className="order-order-date">
                    <Typography>Order was placed on {createdAtString}</Typography>
                </div>
                <div className="order-order-vehicles-wrapper">
                    <table className='order-order-vehicles-table'>
                        <thead className='order-order-vehicles-table-head'>
                            <tr className='order-order-vehicles-table-head-row'>
                                <th><Typography variant='body1'>Vehicle</Typography></th>
                                <th><Typography variant='body1'>Price</Typography></th>
                            </tr>
                        </thead>
                        <tbody className='order-order-vehicles-table'>
                            {
                                vehicles && vehicles.length > 0
                                    ? vehicles.map(v => (
                                        <tr key={v._id}>
                                            <td>
                                                <Typography variant='body1' className='order-order-vehicles-table-body-text'>
                                                    {v.make}
                                                </Typography>
                                                <Typography variant='body1' className='order-order-vehicles-table-body-text'>
                                                    {v.model}
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography variant='body1' className='order-order-vehicles-table-body-text'>
                                                    €{v.price.toFixed(2)}
                                                </Typography>
                                            </td>
                                        </tr>
                                    ))
                                    : <></>
                            }
                        </tbody>
                        <tfoot className='order-order-vehicles-table-footer'>
                            <tr>
                                <td>
                                    <Typography variant='body1' className='order-order-vehicles-table-bold-text'>
                                        Subtotal
                                    </Typography>
                                </td>
                                <td><Typography variant='body1'>€{order?.total.toFixed(2)}</Typography></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography variant='h5' className='order-order-vehicles-table-bold-text'>
                                        Total
                                    </Typography>
                                </td>
                                <td><Typography variant='h5'>€{order?.total.toFixed(2)}</Typography></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </CommonPage>
    )
}
