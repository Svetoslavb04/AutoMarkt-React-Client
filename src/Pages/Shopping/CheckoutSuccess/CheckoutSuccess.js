import './CheckoutSuccess.scss';

import { useEffect, useState } from 'react';

import { useNavigate, useParams, Link } from 'react-router-dom';

import { useLoadingContext } from '../../../contexts/LoadingContext';
import { useNotificationContext, types } from '../../../contexts/NotificationContext';

import { Typography, CheckCircleRoundedIcon, Button } from '../../../mui-imports';

import CommonPage from '../../CommonPage/CommonPage';

import { getOrderById } from '../../../services/orderService';
import { getVehicles } from '../../../services/vehicleService';

export default function Checkout() {

    const navigate = useNavigate();
    const { _id } = useParams();

    const { setIsLoading } = useLoadingContext();

    const { popNotification } = useNotificationContext();

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

            setIsLoading(false);

        }

    }, [setIsLoading, order]);

    const createdAt = new Date(order?.postedOn);

    const monthNameLong = createdAt.toLocaleString("en-US", { month: "long" });

    const createdAtString = `${createdAt.getDate()} ${monthNameLong}, ${createdAt.getFullYear()}`;

    return (
        <CommonPage>
            <div className="checkout-success-wrapper">
                <div className="checkout-success-icon-wrapper">
                    <CheckCircleRoundedIcon className="checkout-success-icon" />
                </div>
                <div className="checkout-success-heading-wrapper">
                    <Typography variant='h3' className="checkout-success-heading">Thank you</Typography>
                    <Typography variant='h5' className="checkout-success-sub-heading">Your order has been received</Typography>
                </div>
                <div className="checkout-success-sub-heading-wrapper">
                    <Link to='/' className='navigation-link-element'>
                        <Button>
                            GO TO HOMEPAGE
                        </Button>
                    </Link>
                </div>
                <div className="checkout-success-info-wrapper">
                    <div className="checkout-success-info-cell">
                        <Typography variant='body1' component='span' className='checkout-succes-info-heading'>Order Number</Typography>
                        <Typography variant='body1' component='span' >#{order?.number}</Typography>
                    </div>
                    <div className="checkout-success-info-cell">
                        <Typography variant='body1' component='span' className='checkout-succes-info-heading'>Created At</Typography>
                        <Typography variant='body1' component='span' >{createdAtString}</Typography>
                    </div>
                    <div className="checkout-success-info-cell">
                        <Typography variant='body1' component='span' className='checkout-succes-info-heading'>Total</Typography>
                        <Typography variant='body1' component='span' >€5000.00</Typography>
                    </div>
                </div>
                <div className="checkout-success-vehicles-wrapper">
                    <table className='checkout-success-vehicles-table'>
                        <thead className='checkout-success-vehicles-table-head'>
                            <tr className='checkout-success-vehicles-table-head-row'>
                                <th><Typography variant='body1'>Vehicle</Typography></th>
                                <th></th>
                                <th><Typography variant='body1'>Price</Typography></th>
                            </tr>
                        </thead>
                        <tbody className='checkout-success-vehicles-table-body'>
                            {
                                vehicles && vehicles.length > 0
                                    ? vehicles.map(v => (
                                        <tr className='checkout-success-vehicles-table-body-row' key={v._id}>
                                            <td><img src={v.imageUrl} alt='' /></td>
                                            <td>
                                                <Typography variant='body1' className='checkout-success-vehicles-table-body-text'>
                                                    {v.make}
                                                </Typography>
                                                <Typography variant='body1' className='checkout-success-vehicles-table-body-text'>
                                                    {v.model}
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography variant='body1' className='checkout-success-vehicles-table-body-text'>
                                                    €{v.price.toFixed(2)}
                                                </Typography>
                                            </td>
                                        </tr>
                                    ))
                                    : <></>
                            }
                        </tbody>
                        <tfoot className='checkout-success-vehicles-table-footer'>
                            <tr>
                                <td>
                                    <Typography variant='body1' className='checkout-success-vehicles-table-bold-text'>
                                        Subtotal
                                    </Typography>
                                </td>
                                <td></td>
                                <td><Typography variant='body1'>€{order?.total.toFixed(2)}</Typography></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography variant='h5' className='checkout-success-vehicles-table-bold-text'>
                                        Total
                                    </Typography>
                                </td>
                                <td></td>
                                <td><Typography variant='h5'>€{order?.total.toFixed(2)}</Typography></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </CommonPage >
    )
}
