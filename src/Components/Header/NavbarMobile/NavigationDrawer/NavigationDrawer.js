import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    List, ListItemIcon, ListItem, SwipeableDrawer,
    Box, Typography, ListItemText
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CategoriesList from '../../CategoriesList/CategoriesList';
import CloseIcon from '@mui/icons-material/Close';
import './NavigationDrawer.scss';
import { useAuthContext } from '../../../../contexts/AuthContext';

export default function NavigationDrawer(props) {

    const [areCategoriesOpened, setAreCategoriesOpened] = React.useState(false);
    const [items, setItems] = React.useState([]);

    const { user } = useAuthContext();

    React.useEffect(() => {
        user.xToken
        ? setItems(['Home', 'Blog', 'Categories', 'Logout'])
        : setItems(['Home', 'Blog', 'Categories', 'Login', 'Register'])
    }, [])

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
                            <Box key='categories-box'>
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
                                <CategoriesList
                                    isOpen={areCategoriesOpened}
                                    collapsable={true}
                                    listClassName='navigation-drawer-categories-list-list'
                                    categories={['Ktm', 'Beta', 'GasGas']}
                                    textFontSize='h6'
                                />
                            </Box>
                        );
                    }

                    return (
                        <Link key={text} to={`/${text.toLowerCase()}`} className='navigation-link-element'>
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
            open={props.isOpened['left']}
            onClose={props.toggleDrawer(false)}
            onOpen={props.toggleDrawer(true)}
        >
            {list('left')}
        </SwipeableDrawer>
    );
}
