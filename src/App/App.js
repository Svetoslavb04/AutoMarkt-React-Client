import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from '../contexts/AuthContext.js';
import { NotificationProvider } from '../contexts/NotificationContext.js';
import { LoadingProvider } from "../contexts/LoadingContext";

import { theme } from '../config/theme';

import { ThemeProvider, StyledEngineProvider } from '../mui-imports';

import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Logout from '../Pages/Logout/Logout';
import Catalog from '../Pages/Catalog/Catalog.js';
import Notification from '../Components/Notification/Notification';
import Details from '../Pages/Details/Details.js';

import './App.scss';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          {
            <NotificationProvider>
              <Header />
              <LoadingProvider>
                <div className="content-wrapper">
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/catalog/:_id" element={<Details />} />
                  </Routes>
                </div>
              </LoadingProvider>
              <Footer />
              <Notification />
            </NotificationProvider>
          }
        </StyledEngineProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
