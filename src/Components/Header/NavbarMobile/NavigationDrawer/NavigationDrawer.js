import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuthContext } from '../../../../contexts/AuthContext';

import {
    List, ListItemIcon, ListItem, SwipeableDrawer,
    Box, Typography, ListItemText, CloseIcon, KeyboardArrowDownIcon
} from '../../../../mui-imports.js';

import NavigationCollapsableList from '../../NavigationCollapsableList/NavigationCollapsableList';

import './NavigationDrawer.scss';


export default function NavigationDrawer(props) {

    const [areCategoriesOpened, setAreCategoriesOpened] = useState(false);
    const [items, setItems] = useState([]);

    const { user } = useAuthContext();

    useEffect(() => {
        user.isAuthenticated
            ? setItems(['Home', 'Catalog', 'Categories', 'Sell Vehicle', 'Wish List', 'Shopping Cart', 'Order History', 'About Us', 'Logout'])
            : setItems(['Home', 'Login', 'Register', 'Catalog', 'Categories', 'Wish List', 'Shopping Cart', 'About Us'])
    }, [user.isAuthenticated])

    const toggleCategoriesList = () => () => {
        setAreCategoriesOpened((areCategoriesOpened) => !areCategoriesOpened);
    }

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 280 }}
            role="presentation"
            onKeyDown={props.toggleDrawer(false)}
        >
            <List className='navigation-drawer-list'>
                <ListItem className='navigation-drawer-header-cell'>
                    <ListItemText key='drawerHeaderText'>
                        <Typography
                            className='navigation-drawer-header-text'
                            variant='h5'
                            component='h2'
                        >
                            Menu
                        </Typography>
                    </ListItemText>
                    <ListItemIcon
                        key='drawerHeaderIcon'
                        className='navigation-drawer-header-icon-cell'
                    >
                        <CloseIcon
                            className='navigation-drawer-header-icon'
                            onClick={props.toggleDrawer(false)}
                        />
                    </ListItemIcon>
                </ListItem>

                {items.map((text) => {

                    if (text === 'Categories') {
                        return (
                            <div key='categories-box'>
                                <ListItem
                                    className='navigation-drawer-categories-cell'
                                    key={text}
                                    onClick={toggleCategoriesList()}
                                >

                                    <ListItemText
                                        key={`${text}text`}
                                        className='navigation-drawer-categories-text-cell'
                                    >
                                        <Link className='navigation-link-element' to='/catalog'>
                                            <Typography
                                                variant='h5'
                                                component='h2'
                                                className='navigation-drawer-categories-text'
                                            >
                                                {text}
                                            </Typography>
                                        </Link>

                                    </ListItemText>

                                    <ListItemIcon
                                        className='navigation-drawer-categories-icon-cell'
                                        key='keyboardIcon'
                                    >
                                        <KeyboardArrowDownIcon
                                            className={
                                                `navigation-drawer-categories-icon
                                                ${areCategoriesOpened
                                                    ? 'rotated'
                                                    : 'closed'}`
                                            } />
                                    </ListItemIcon>
                                </ListItem>
                                <NavigationCollapsableList
                                    isOpen={areCategoriesOpened}
                                    collapsable={true}
                                    listClassName='navigation-drawer-categories-list-list'
                                    items={['Motorcycles', 'Cars', 'ATVs', 'Snowbikes', 'Trucks']}
                                    itemsAreLinks={true}
                                    textFontSize='h6'
                                />
                            </div>
                        );
                    }

                    let path = `/${text.toLowerCase().split(' ').join('-') == 'home'
                        ? ''
                        : text.toLowerCase().split(' ').join('-')}`;

                    if (text == 'Sell Vehicle') path = '/catalog'.concat('', path);

                    return (
                        <Link key={text} to={path} className='navigation-link-element'>
                            <ListItem
                                className='navigation-drawer-button-cell'
                                button
                            >
                                <Typography
                                    className='navigation-drawer-button-text'
                                    variant='h5'
                                    component='h2'
                                >
                                    {text}
                                </Typography>
                            </ListItem>
                        </Link>
                    )
                })}
            </List>
        </Box >
    );

    return (
        <SwipeableDrawer
            anchor='left'
            open={props.isOpened}
            onClose={props.toggleDrawer(false)}
            onOpen={props.toggleDrawer(true)}
        >
            {list('left')}
        </SwipeableDrawer>
    );
}
