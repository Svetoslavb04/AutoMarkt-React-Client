import { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";

import { getVehicles } from '../../../../services/vehicleService';

import { useAuthContext } from '../../../../contexts/AuthContext';
import { useWishListContext } from '../../../../contexts/WishListContext';
import { useShoppingCartContext } from '../../../../contexts/ShoppingCartContext';

import {
    AppBar, Button, Toolbar, styled, KeyboardArrowDownIcon, FavoriteIcon,
    ShoppingCartIcon, MenuOpenIcon, Typography, CloseIcon, Collapse
} from '../../../../mui-imports.js';

import NavigationCollapsableList from '../../NavigationCollapsableList/NavigationCollapsableList';

import './LowerNavbarLargeScreen.scss'

const NavButton = styled(Button)(({ theme }) => ({
    maxWidth: '100%',
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
    },
    minWidth: '0',
    fontSize: '1.2rem',
    color: 'white'
}));

export default function NavbarBigScreen() {

    const [areCategoriesOpened, setAreCategoriesOpened] = useState(false);

    const [isShoppingCartOpened, setIsShoppingCartOpened] = useState(false);

    const toggleCategoriesList = () => () => {

        setAreCategoriesOpened((areCategoriesOpened) => !areCategoriesOpened);
    }

    const { user } = useAuthContext();
    const { wishListItemsCount } = useWishListContext();
    const { shoppingCartItemsCount, shoppingCartItems, setShoppingCartItems } = useShoppingCartContext();

    const [shoppingCartVehicles, setShoppingCartVehicles] = useState();

    const location = useLocation();

    const totalPrice = shoppingCartVehicles?.reduce((prev, curr) => prev + curr.price, 0).toFixed(2);

    useEffect(() => {

        setIsShoppingCartOpened(false);
        setAreCategoriesOpened(false);

    }, [location]);

    useEffect(() => {
        if (shoppingCartVehicles) {
            getVehicles(shoppingCartItems.slice(0, 2))
                .then(vehicles => {

                    setShoppingCartVehicles(vehicles);
                    setIsShoppingCartOpened(true)
                });
        }
    }, [shoppingCartItems]);

    const handleShoppingCartToggle = () => {

        if (isShoppingCartOpened) {

            setIsShoppingCartOpened(false);
            setShoppingCartVehicles(undefined);

        } else {
            getVehicles(shoppingCartItems.slice(0, 2))
                .then(vehicles => {

                    setShoppingCartVehicles(vehicles);
                    setIsShoppingCartOpened(true)
                });
        }
    }

    const handleRemoveFromCart = (_id) =>
        setShoppingCartItems(items => items.filter(item => item != _id));


    return (
        <div>
            <AppBar className='header-navbar-appbar' color='primary'>
                <Toolbar className='header-navbar-toolbar-desktop'>
                    <div className='header-navbar-toolbar-categories-box'>
                        <div
                            className='header-all-categories-text-box'
                            onClick={toggleCategoriesList()}
                        >
                            <MenuOpenIcon className='header-all-categories-text-icon' fontSize='large' />
                            <Button
                                className='header-all-categories-button'
                                variant='text'
                                disableRipple={true}
                                disableFocusRipple={true}
                                disableTouchRipple={true}
                            >
                                All Categories
                            </Button>
                            <KeyboardArrowDownIcon
                                className={`dynamic-arrow ${areCategoriesOpened ? 'rotated' : 'closed'}`}
                            />
                        </div>
                        <NavigationCollapsableList
                            isOpen={areCategoriesOpened}
                            collapsable={true}
                            className='header-all-categories-list'
                            listClassName='header-categories-list-list'
                            items={['Motorcycles', 'Cars', 'ATVs', 'Snowbikes', 'Trucks']}
                            itemsAreLinks={true}
                            textFontSize='h6'
                        />
                    </div>
                    <div>
                        <Link to="/" className='navigation-link-element'>
                            <NavButton variant='text' sx={{ ml: '20px' }}>Home</NavButton>
                        </Link>
                    </div>
                    {
                        user.isAuthenticated
                            ? <>
                                <div style={{ maxWidth: '100%' }}>
                                    <Link to="/blog" className='navigation-link-element'>
                                        <NavButton>Blog</NavButton>
                                    </Link>
                                </div>
                                <div style={{ flexGrow: 1 }}>
                                    <Link to="/order-history" className='navigation-link-element'>
                                        <NavButton>Order History</NavButton>
                                    </Link>
                                </div>
                            </>
                            : <div style={{ maxWidth: '100%', flexGrow: 1 }}>
                                <Link to="/blog" className='navigation-link-element'>
                                    <NavButton>Blog</NavButton>
                                </Link>
                            </div>
                    }

                    {
                        user.isAuthenticated
                            ? <></>
                            : <div>
                                <Link to="/register" className='navigation-link-element'>
                                    <NavButton>Become a seller</NavButton>
                                </Link>
                            </div>
                    }

                    <div>
                        <Link to="/wish-list" className='navigation-link-element'>
                            <NavButton className='header-wish-list-button'>
                                <FavoriteIcon />
                                <span className='header-indicator'>{wishListItemsCount}</span>
                            </NavButton>
                        </Link>
                    </div>
                    <div className='header-desktop-navigation-shopping-cart-link-wrapper'>
                        <NavButton
                            className='header-shopping-cart-button'
                            onClick={handleShoppingCartToggle}
                        >
                            <ShoppingCartIcon />
                            <span className='header-indicator'>{shoppingCartItemsCount}</span>
                        </NavButton>
                        <Collapse
                            in={isShoppingCartOpened}
                            unmountOnExit
                            component='div'
                            className="header-shopping-cart-wrapper"
                        >
                            {
                                shoppingCartVehicles?.length > 0
                                    ? <>
                                        {shoppingCartVehicles.map(vehicle => (
                                            <div key={vehicle._id} className="header-shopping-cart-vehicle-wrapper">
                                                <div className="header-shopping-cart-vehicle-image-wrapper">
                                                    <img
                                                        src={vehicle.imageUrl} alt="vehicle"
                                                        className="header-shopping-cart-vehicle-image"
                                                    />
                                                </div>
                                                <div className="header-shopping-cart-vehicle-info-wrapper">
                                                    <div className="header-shopping-cart-vehicle-info-make-model-wrapper">
                                                        <Link to={`/catalog/${vehicle._id}`} className='navigation-link-element'>
                                                            <Typography
                                                                className="header-shopping-cart-vehicle-info-text"
                                                            >
                                                                {vehicle.make} {vehicle.model}
                                                            </Typography>
                                                        </Link>
                                                    </div>
                                                    <div className="header-shopping-cart-vehicle-info-price-wrapper">
                                                        <Typography
                                                            className="header-shopping-cart-vehicle-info-text"
                                                        >
                                                            €{vehicle.price}
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <div className="header-shopping-cart-vehicle-close-wrapper">
                                                    <CloseIcon
                                                        className='header-shopping-card-remove-from-cart-icon'
                                                        onClick={handleRemoveFromCart.bind(null, vehicle._id)}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                        }
                                        {
                                            shoppingCartItems.length > 2
                                                ? <div className="header-shopping-cart-vehicle-wrapper">
                                                    <Link to='/shopping-cart' className='navigation-link-element'>
                                                        <Typography
                                                            variant='h6'
                                                            className='header-shopping-cart-go-to-shopping-cart'
                                                        >
                                                            View full shopping cart
                                                        </Typography>
                                                    </Link>
                                                </div>
                                                : <></>
                                        }
                                        <div className="header-shopping-cart-total-wrapper">
                                            <div className="header-shopping-total-text-wrapper">
                                                <Typography
                                                    className="header-shopping-total-text"
                                                >
                                                    Total
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography
                                                    className="header-empty-shopping-cart-text"
                                                >
                                                    €{totalPrice}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className="header-shopping-cart-buttons-wrapper">
                                            <div>
                                                <Link to='/shopping-cart' className='navigation-link-element'>
                                                    <Button
                                                        variant='contained'
                                                        className="header-shopping-cart-buttons-button"
                                                    >
                                                        View Cart
                                                    </Button>
                                                </Link>
                                            </div>
                                            <div>
                                                <Link to='/checkout' className='navigation-link-element'>
                                                    <Button
                                                        variant='contained'
                                                        className="header-shopping-cart-buttons-button"
                                                    >
                                                        Checkout
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                    : <div className="header-empty-shopping-cart">
                                        <Typography
                                            className="header-empty-shopping-cart-text"
                                        >
                                            Shopping cart is empty!
                                        </Typography>
                                    </div>
                            }
                        </Collapse>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}