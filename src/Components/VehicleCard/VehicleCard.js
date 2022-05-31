import { useEffect, useState } from 'react';

import {
  Card, CardContent, CardMedia, Divider, Typography, Button, FavoriteIcon
} from '../../mui-imports.js';

import { useAuthContext } from '../../contexts/AuthContext';
import { useShoppingCartContext } from '../../contexts/ShoppingCartContext';
import { useWishListContext } from '../../contexts/WishListContext';
import { useNotificationContext, types } from "../../contexts/NotificationContext";

import './VehicleCard.scss';

export default function VehicleCard(props) {

  const { user } = useAuthContext();
  const { shoppingCartItems, setShoppingCartItems } = useShoppingCartContext();
  const { wishListItems, setWishListItems } = useWishListContext();

  const { popNotification } = useNotificationContext();

  const [isFavourite, setIsFavourite] = useState();

  useEffect(() => {

    if (wishListItems.includes(props._id)) {

      setIsFavourite(true);

    } else {

      setIsFavourite(false);

    }
  }, [props._id, wishListItems]);

  const handleAddToCart = (e) => {

    e.preventDefault();

    if (shoppingCartItems) {
      if (!shoppingCartItems.includes(props._id)) {

        setShoppingCartItems([props._id, ...shoppingCartItems]);

      } else {
        return popNotification(`${props.make} ${props.model} is already in the cart!`, types.success);
      }
    } else {

      setShoppingCartItems([props._id]);

    }

    popNotification(`${props.make} ${props.model} has been added to the cart!`, types.success);

  }

  const handleToggleFavourite = (e) => {

    e.preventDefault();

    if (isFavourite) {
      popNotification(`Vehicle ${props.make} ${props.model} removed from wish list!`, types.success);
    } else {
      popNotification(`Vehicle ${props.make} ${props.model} added to wish list!`, types.success);
    }

    setIsFavourite(prev => !prev);

    if (wishListItems) {
      if (wishListItems.includes(props._id)) {

        setWishListItems(wishListItems.filter(element => element != props._id));

      } else {

        setWishListItems([props._id, ...wishListItems]);

      }
    } else {

      setWishListItems([props._id]);

    }


  }

  return (
    <Card className='vehicle-card-wrapper'>
      <div className='vehicle-card-image-wrapper'>
        <CardMedia
          className='vehicle-card-image'
          component="img"
          height="275"
          srcSet={`${props.imageUrl}`}
          alt="Photo of the vehicle"
        />
      </div>
      <CardContent className='vehicle-card-content-wrapper'>
        <div className='vehicle-card-make-model-wrapper'>
          <div className='vehicle-card-make-model-cell'>
            <Typography className='vehicle-card-make' variant="h5">
              {props.make}
            </Typography>
          </div>
          <div>
            <Typography className='vehicle-card-model' variant="h5">
              {props.model}
            </Typography>
          </div>
        </div>
        <Divider className='vehicle-card-divider' />
        <div className='vehicle-card-year-mileage-wrapper'>
          <div className='vehicle-card-year-milage-cell'>
            <Typography className='vehicle-card-year' variant="h6">
              {props.year},
            </Typography>
          </div>
          <div>
            <Typography className='vehicle-card-milage' variant="h6">
              {props.mileage}km
            </Typography>
          </div>
        </div>
        <div className="vehicle-card-price-buttons-wrapper">
          <Typography className='vehicle-card-price' variant="h6">
            €{props.price}
          </Typography>
          {
            props.buttons && props.publisherId != user._id
              ? <div className="vehicle-card-buttons-wrapper">
                <Button
                  variant="contained"
                  className="vehicle-card-add-to-cart"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button
                  component='p'
                  className={`wish-list-icon vehicle-wish-list-icon${!isFavourite ? ' wish-list-icon-not-selected' : ''}`}
                  variant={isFavourite ? 'contained' : 'outlined'}
                  onClick={handleToggleFavourite}
                >
                  <FavoriteIcon className="wish-list-icon" fontSize="small" />
                </Button>
              </div>
              : <></>
          }

        </div>
      </CardContent>
    </Card>
  );
}
