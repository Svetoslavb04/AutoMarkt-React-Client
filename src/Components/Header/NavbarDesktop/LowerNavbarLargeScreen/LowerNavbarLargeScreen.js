import { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";

import { useAuthContext } from '../../../../contexts/AuthContext';
import { useWishListContext } from '../../../../contexts/WishListContext';
import { useShoppingCartContext } from '../../../../contexts/ShoppingCartContext';

import {
    AppBar, Button, Toolbar, styled, KeyboardArrowDownIcon, FavoriteIcon, ShoppingCartIcon, MenuOpenIcon
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

    const toggleCategoriesList = () => () => {

        setAreCategoriesOpened((areCategoriesOpened) => !areCategoriesOpened);
    }

    const { user } = useAuthContext();
    const { wishListItemsCount } = useWishListContext();
    const { shoppingCartItemsCount } = useShoppingCartContext();

    const location = useLocation();

    useEffect(() => {

        setAreCategoriesOpened(false);

    }, [location]);

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
                            <NavButton>
                                <FavoriteIcon />
                                <span className='header-indicator'>{wishListItemsCount}</span>
                            </NavButton>
                        </Link>
                    </div>
                    <div>
                        <Link to="/shopping-cart" className='navigation-link-element'>
                            <NavButton>
                                <ShoppingCartIcon />
                                <span className='header-indicator'>{shoppingCartItemsCount}</span>
                            </NavButton>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}