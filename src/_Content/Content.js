import { Routes, Route } from 'react-router-dom';

import { CatalogDataProvider } from '../contexts/CatalogDataContext';
import { useNotificationContext } from '../contexts/NotificationContext';

import AuthenticatedRoute from '../Components/Routes/AuthenticatedRoute';

import Notification from '../Components/Notification/Notification';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Logout from '../Pages/Logout/Logout';
import Catalog from '../Pages/Catalog/Catalog';
import Details from '../Pages/Details/Details';
import WishList from '../Pages/WishList/WishList';
import ShoppingCart from '../Pages/ShoppingCart/ShoppingCart';

import { TransitionGroup, Slide } from '../mui-imports';

import './Content.scss';

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
                        <Route path="/catalog/:_id" element={<Details />} />
                        <Route path="/wish-list" element={<WishList />} />
                        <Route path="/shopping-cart" element={<ShoppingCart />} />
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