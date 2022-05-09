import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuthContext } from '../../../../contexts/AuthContext';

import {
    List, ListItemIcon, ListItem, SwipeableDrawer,
    Box, Typography, ListItemText, CloseIcon, KeyboardArrowDownIcon
} from '../../../../mui-imports.js';

import CollapsableList from '../../../CollapsableList/CollapsableList';

import './NavigationDrawer.scss';


export default function NavigationDrawer(props) {

    const [areCategoriesOpened, setAreCategoriesOpened] = useState(false);
    const [items, setItems] = useState([]);

    const { user } = useAuthContext();

    useEffect(() => {
        user.xToken
            ? setItems(['Home', 'Blog', 'Categories', 'Logout', 'Wish List', 'Shopping Cart'])
            : setItems(['Home', 'Blog', 'Categories', 'Login', 'Register'])
    }, [user.xToken])

    const toggleCategoriesList = () => () => {
        setAreCategoriesOpened((areCategoriesOpened) => !areCategoriesOpened);
    }

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
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
                                        <Typography
                                            variant='h5'
                                            component='h2'
                                            className='navigation-drawer-categories-text'
                                        >
                                            {text}
                                        </Typography>
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
                                <CollapsableList
                                    isOpen={areCategoriesOpened}
                                    collapsable={true}
                                    listClassName='navigation-drawer-categories-list-list'
                                    items={['Motorcycle', 'ATV', 'Snowbike', 'Car', 'Truck']}
                                    textFontSize='h6'
                                />
                            </div>
                        );
                    }

                    const path = `/${text.toLowerCase().split(' ').join('-') == 'home'
                        ? ''
                        : text.toLowerCase().split(' ').join('-')}`;

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
