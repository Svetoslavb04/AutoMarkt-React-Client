import * as React from 'react';
import {
    List, ListItemIcon, ListItem, SwipeableDrawer,
    Box, Typography, Collapse, ListItemText
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DrawerHeader from './DrawerHeader.js/DrawerHeader';
import CategoriesList from '../../CategoriesList.js/CategoriesList';
import DrawerItem from './DrawerItem/DrawerItem';
import './NavigationDrawer.scss'

export default function NavigationDrawer(props) {

    const [areCategoriesOpened, setAreCategoriesOpened] = React.useState(false);

    const toggleCategoriesList = () => () => {
        setAreCategoriesOpened((areCategoriesOpened) => !areCategoriesOpened);
    }

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onKeyDown={props.toggleDrawer(false)}
        >
            <List sx={{ p: '0' }}>
                <DrawerHeader
                    text='Menu'
                    onClick={props.toggleDrawer(false)}
                />

                {['Home', 'Blog', 'Categories', 'Become a seller', 'Logout', 'Login', 'Register'].map((text) => {

                    if (text === 'Categories') {
                        return (
                            <Box key='categories-box'>
                                <ListItem
                                    key={text}
                                    sx={{
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #ebebeb',
                                        p: '12px 0px 12px 20px'
                                    }}
                                    onClick={toggleCategoriesList()}
                                >
                                    <ListItemText
                                        key={`${text}text`}
                                        sx={{ m: '0' }}
                                    >
                                        <Typography
                                            variant='h5'
                                            component='h2'
                                            sx={{ letterSpacing: '2px', borderRight: '1px solid #ebebeb' }}
                                        >
                                            {text}
                                        </Typography>
                                    </ListItemText>
                                    <ListItemIcon
                                        key='keyboardIcon'
                                        sx={{ justifyContent: 'center' }}
                                    >
                                        <KeyboardArrowDownIcon
                                            className={areCategoriesOpened ? 'rotated' : 'closed'}
                                            color='secondary.dark'
                                            sx={{
                                                '&:hover': {
                                                    fill: 'black'
                                                }
                                            }} />
                                    </ListItemIcon>
                                </ListItem>
                                <Collapse in={areCategoriesOpened} mountOnEnter unmountOnExit>
                                    <CategoriesList
                                        categories={['Ktm', 'Beta', 'GasGas']}
                                        categoryFontSize='h6'
                                        categoryFontColor='dark'
                                    />
                                </Collapse>
                            </Box>
                        );
                    }

                    return (
                        <DrawerItem key={text} text={text} variant='h5' />);
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
