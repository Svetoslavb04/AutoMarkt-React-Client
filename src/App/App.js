import './App.scss';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../config/theme';
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Logout from '../Pages/Logout/Logout';
import { AuthProvider } from '../contexts/AuthContext.js';
import * as React from 'react';

function App() {

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
