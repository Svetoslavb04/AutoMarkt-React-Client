import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { useLoadingContext } from "../../contexts/LoadingContext";

import { getVehicles } from "../../services/vehicleService";

import { Typography, Button, CloseIcon, CircularProgress } from '../../mui-imports';

import CommonPage from "../CommonPage/CommonPage";

import './ShoppingCart.scss';

export default function ShoppingCart() {

    const { setIsLoading } = useLoadingContext();

    const { shoppingCartItems, setShoppingCartItems } = useShoppingCartContext();

    const [vehicles, setVehicles] = useState(undefined);

    const subtotal = vehicles?.reduce((prev, curr) => prev + curr.price, 0).toFixed(2);
    const total = vehicles?.reduce((prev, curr) => prev + curr.price, 0).toFixed(2);

    useEffect(() => {
        
        if (vehicles) {
            setIsLoading(false);
        }

    }, [vehicles, setIsLoading])

    useEffect(() => {

        getVehicles(shoppingCartItems)
            .then(vehicles => setVehicles(vehicles))
            .catch(err => setVehicles([]));

    }, [shoppingCartItems]);

    const handleRemoveShoppingCart = (_id) =>
        setShoppingCartItems(oldItems => oldItems.filter(item => item != _id));

    return (
        <CommonPage breadcrumbs={['Home', 'Shopping cart']}>
            <Typography variant='h3' className="shopping-cart-heading-text">Shopping Cart</Typography>
            {
                vehicles
                    ? vehicles.length > 0
                        ? <>
                            <div>
                                <table className="shopping-cart-table">
                                    <thead>
                                        <tr className="shopping-cart-table-head-row">
                                            <td className="shopping-cart-table-head-cell"><Typography className="shopping-cart-table-head-text">Image</Typography></td>
                                            <td className="shopping-cart-table-head-cell"><Typography className="shopping-cart-table-head-text">Vehicle</Typography></td>
                                            <td className="shopping-cart-table-head-cell"><Typography className="shopping-cart-table-head-text">Year</Typography></td>
                                            <td className="shopping-cart-table-head-cell"><Typography className="shopping-cart-table-head-text">Mileage</Typography></td>
                                            <td className="shopping-cart-table-head-cell"><Typography className="shopping-cart-table-head-text">Price</Typography></td>
                                            <td className="shopping-cart-table-head-cell"></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            vehicles.map(vehicle =>
                                                <tr key={vehicle._id} className="shopping-cart-table-row">
                                                    <td className="shopping-cart-image-cell shopping-cart-cell">
                                                        <Link to={`/catalog/${vehicle._id}`} className="navigation-link-element">
                                                            <img src={vehicle.imageUrl} className="shopping-cart-image" alt=""/>
                                                        </Link>
                                                    </td>
                                                    <td className="shopping-cart-vehicle-cell shopping-cart-cell">
                                                        <Link to={`/catalog/${vehicle._id}`} className="navigation-link-element">
                                                            <Typography>{vehicle.make} {vehicle.model}</Typography>
                                                        </Link>
                                                    </td>
                                                    <td className="shopping-cart-year-cell shopping-cart-cell">
                                                        <Typography>{vehicle.year}</Typography>
                                                    </td>
                                                    <td className="shopping-cart-mileage-cell shopping-cart-cell">
                                                        <Typography>{vehicle.mileage}</Typography>
                                                    </td>
                                                    <td className="shopping-cart-price-cell shopping-cart-cell">
                                                        <Typography>€{vehicle.price}</Typography>
                                                    </td>
                                                    <td className="shopping-cart-remove-from-cart-cell shopping-cart-cell">
                                                        <CloseIcon
                                                            className="shopping-cart-remove-from-cart-icon"
                                                            onClick={handleRemoveShoppingCart.bind(null, vehicle._id)}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="shopping-cart-continue-shoppping-wrapper">
                                <Link
                                    to='/catalog'
                                    className="navigation-link-element shopping-cart-continue-shoppping-link"
                                >
                                    <Button
                                        variant="outlined"
                                        className="shopping-cart-continue-shoppping-button"
                                    >
                                        Continue shopping
                                    </Button>
                                </Link>
                            </div>
                            <div className="shopping-cart-total-wrapper">
                                <div className="shopping-cart-total-box-wrapper">
                                    <div className="shopping-cart-total-heading-wrapper">
                                        <Typography variant="h4" className="shopping-cart-total-heading">Totals</Typography>
                                    </div>
                                    <div className="shopping-cart-sub-total-wrapper">
                                        <Typography className="shopping-cart-sub-total-heading">Subtotal</Typography>
                                        <Typography className="shopping-cart-sub-total-value">€{subtotal}</Typography>
                                    </div>
                                    <div className="shopping-cart-additional-taxes-wrapper">
                                        <Typography className="shopping-cart-tax-heading">Tax</Typography>
                                        <Typography className="shopping-cart-tax-value">€0.00</Typography>
                                    </div>
                                    <div className="shopping-cart-total-price-wrapper">
                                        <Typography variant="h5" className="shopping-cart-total-price-heading">Total</Typography>
                                        <Typography variant="h5" className="shopping-cart-total-price-value">€{total}</Typography>
                                    </div>
                                    <div className="shopping-cart-proceed-button-wrapper">
                                        <Link to='/checkout' className="navigation-link-element shopping-cart-proceed-button-link">
                                            <Button
                                                className="shopping-cart-proceed-button"
                                                variant="contained"
                                            >
                                                Proceed to checkout
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                        : <div className="shopping-cart-empty-wrapper">
                            <Typography variant="h6">Shopping cart is empty!</Typography>
                            <Link to='/catalog' className="navigation-link-element">
                                <Button variant="contained">Go to catalaog</Button>
                            </Link>
                        </div>
                    : <CircularProgress />
            }

        </CommonPage>
    )
}