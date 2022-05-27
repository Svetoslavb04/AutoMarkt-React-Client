import './Content.scss';

import { Routes, Route } from 'react-router-dom';

import { CatalogDataProvider } from '../contexts/CatalogDataContext';
import { useNotificationContext } from '../contexts/NotificationContext';

import { TransitionGroup, Slide } from '../mui-imports';

import AuthenticatedRoute from '../Components/Routes/AuthenticatedRoute';

import Notification from '../Components/Notification/Notification';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Logout from '../Pages/Logout/Logout';
import Catalog from '../Pages/Catalog/Catalog';
import Details from '../Pages/Vehicle/Details/Details';
import WishList from '../Pages/WishList/WishList';
import ShoppingCart from '../Pages/ShoppingCart/ShoppingCart';
import Create from '../Pages/Vehicle/Create/Create';
import Edit from '../Pages/Vehicle/Edit/Edit';
import NotFound from '../Pages/NotFound/NotFound';
import AboutUs from '../Pages/AboutUs/AboutUs';
import Checkout from '../Pages/Checkout/Checkout';

export default function Content() {

    const { notifications } = useNotificationContext();

    return (
        <>
            <CatalogDataProvider>
                <div className="content-wrapper">
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <Logout />
                            </AuthenticatedRoute>
                        } />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/catalog/sell-vehicle" element={
                            <AuthenticatedRoute>
                                <Create />
                            </AuthenticatedRoute>
                        } />
                        <Route path="/catalog/:_id/edit" element={<Edit />} />
                        <Route path="/catalog/:_id" element={<Details />} />
                        <Route path="/wish-list" element={<WishList />} />
                        <Route path="/shopping-cart" element={<ShoppingCart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="*" element={<NotFound />} />

                    </Routes>
                </div>
                <div className='notifications'>
                    <TransitionGroup>
                        {
                            notifications.map(n => (
                                <Slide key={n.message} mountOnEnter unmountOnExit direction='left'>
                                    <div>
                                        <Notification
                                            message={n.message}
                                            type={n.type}
                                        />
                                    </div>
                                </Slide>
                            ))
                        }
                    </TransitionGroup>
                </div>
            </CatalogDataProvider>
        </>
    )
} 