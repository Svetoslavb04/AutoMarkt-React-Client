import './App.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../config/theme';
import { Routes, Route } from 'react-router-dom';
import Home from '../../Pages/Home/Home';
import Login from '../../Pages/Login/Login';
import Register from '../../Pages/Register/Register';
import { AuthContext } from '../../contexts/AuthContext.js';
import * as React from 'react';

function App() {
  const [user, setUser] = React.useState({ user: null });

  React.useEffect(() => {
    setUser({ user: null });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      <ThemeProvider theme={theme}>
        <Header />
        <div className="content-wrapper">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </ThemeProvider>
    </AuthContext.Provider>

  );
}

export default App;
