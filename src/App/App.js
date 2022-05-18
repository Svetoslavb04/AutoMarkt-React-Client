import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from '../contexts/AuthContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import { LoadingProvider } from "../contexts/LoadingContext";
import { WishListProvider } from "../contexts/WishListContext";
import { ShoppingCartProvider } from "../contexts/ShoppingCartContext";

import { theme } from '../config/theme';

import { ThemeProvider, StyledEngineProvider } from '../mui-imports';

import AuthenticatedRoute from '../Components/Routes/AuthenticatedRoute';

import Notification from '../Components/Notification/Notification';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Logout from '../Pages/Logout/Logout';
import Catalog from '../Pages/Catalog/Catalog';
import Details from '../Pages/Details/Details';
import WishList from '../Pages/WishList/WishList';

import './App.scss';

function App() {

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          {
            <NotificationProvider>
              <WishListProvider>
                <ShoppingCartProvider>
                  <Header />
                  <LoadingProvider>
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
                      </Routes>
                    </div>
                  </LoadingProvider>
                  <Footer />
                  <Notification />
                </ShoppingCartProvider>
              </WishListProvider>
            </NotificationProvider>
          }
        </StyledEngineProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
