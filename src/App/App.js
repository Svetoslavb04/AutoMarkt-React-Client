import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from '../contexts/AuthContext.js';
import { NotificationProvider } from '../contexts/NotificationContext.js';
import { theme } from '../config/theme';
import { ThemeProvider } from '@mui/material/styles';

import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Logout from '../Pages/Logout/Logout';
import Notification from '../Components/Notification/Notification';

import './App.scss';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <NotificationProvider>
          <Header />
          <div className="content-wrapper">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/logout' element={<Logout />} />
            </Routes>
          </div>
          <Footer />
          <Notification />
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
