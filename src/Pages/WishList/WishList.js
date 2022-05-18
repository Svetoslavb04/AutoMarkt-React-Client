import { useState, useEffect } from "react";
import { useWishListContext } from "../../contexts/WishListContext";
import { useShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { useNotificationContext, types } from "../../contexts/NotificationContext";
import { Link } from "react-router-dom";

import { getVehicle } from "../../services/vehicleService";

import { Typography, Button, CloseIcon } from '../../mui-imports';

import CommonPage from "../CommonPage/CommonPage";

import './WishList.scss';

export default function WishList(props) {

    const { wishListItems, setWishListItems } = useWishListContext();
    const { shoppingCartItems, setShoppingCartItems } = useShoppingCartContext();
    const { popNotification } = useNotificationContext();

    const [vehicles, setVehicles] = useState(undefined);

    useEffect(() => {

        const itemsForState = [];

        wishListItems.forEach((_id, i) => {
            getVehicle(_id)
                .then(vehicle => {

                    itemsForState.push(vehicle);

                    if (i == wishListItems.length - 1) {

                        setVehicles(itemsForState);

                    }
                });
        });

    }, []);

    const handleRemoveFromWishList = (_id) => {

        setWishListItems(wishListItems.filter(item => item != _id));
        setVehicles(oldVehicles => oldVehicles.filter(vehicle => vehicle._id != _id));

    }

    const handleAddToShoppingCart = (_id, make, model) => {

        if (!shoppingCartItems.includes(_id)) {

            setShoppingCartItems(oldItems => [_id, ...oldItems])

        }

        popNotification(`Successfully added ${make} ${model} to the shopping cart!`, types.success);
    }

    return (
        <CommonPage breadcrumbs={['Home', 'Wish List']}>
            <Typography variant='h3' className="wish-list-heading-text">Wish List</Typography>
            {
                vehicles
                    ? vehicles.length > 0
                        ? <table className="wish-list-table">
                            <thead>
                                <tr className="wish-list-table-head-row">
                                    <td className="wish-list-table-head-cell"><Typography className="wish-list-table-head-text">Image</Typography></td>
                                    <td className="wish-list-table-head-cell"><Typography className="wish-list-table-head-text">Vehicle</Typography></td>
                                    <td className="wish-list-table-head-cell"><Typography className="wish-list-table-head-text">Year</Typography></td>
                                    <td className="wish-list-table-head-cell"><Typography className="wish-list-table-head-text">Mileage</Typography></td>
                                    <td className="wish-list-table-head-cell"><Typography className="wish-list-table-head-text">Price</Typography></td>
                                    <td className="wish-list-table-head-cell"></td>
                                    <td className="wish-list-table-head-cell"></td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    vehicles.map(vehicle =>
                                        <tr key={vehicle._id} className="wish-list-table-row">
                                            <td className="wish-list-image-cell wish-list-cell">
                                                <Link to={`/catalog/${vehicle._id}`} className="navigation-link-element">
                                                    <img src={vehicle.imageUrl} className="wish-list-image" />
                                                </Link>
                                            </td>
                                            <td className="wish-list-vehicle-cell wish-list-cell">
                                                <Link to={`/catalog/${vehicle._id}`} className="navigation-link-element">
                                                    <Typography>{vehicle.make} {vehicle.model}</Typography>
                                                </Link>
                                            </td>
                                            <td className="wish-list-year-cell wish-list-cell">
                                                <Typography>{vehicle.year}</Typography>
                                            </td>
                                            <td className="wish-list-mileage-cell wish-list-cell">
                                                <Typography>{vehicle.mileage}</Typography>
                                            </td>
                                            <td className="wish-list-price-cell wish-list-cell">
                                                <Typography>€{vehicle.price}</Typography>
                                            </td>
                                            <td className="wish-list-add-to-cart-cell wish-list-cell">
                                                <Button
                                                    variant="contained"
                                                    className="wish-list-add-to-cart-cell"
                                                    onClick={handleAddToShoppingCart.bind(null, vehicle._id, vehicle.make, vehicle.model)}
                                                >
                                                    Add to Cart
                                                </Button>
                                            </td>
                                            <td className="wish-list-remove-from-cart-cell wish-list-cell">
                                                <CloseIcon
                                                    className="wish-list-remove-from-cart-icon"
                                                    onClick={handleRemoveFromWishList.bind(null, vehicle._id)}
                                                />
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        : <div className="wish-list-empty-wrapper">
                            <Typography variant="h6">Wish list is empty!</Typography>
                            <Link to='/catalog' className="navigation-link-element">
                                <Button variant="contained">Go to catalaog</Button>
                            </Link>
                        </div>
                    : <></>
            }

        </CommonPage>
    )
}