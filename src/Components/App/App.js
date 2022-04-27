import './App.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../config/theme';
import { Routes, Route } from 'react-router-dom';
import Home from '../../Pages/Home/Home';
import Login from '../../Pages/Login/Login';
import Register from '../../Pages/Register/Register';


function App() {
  return (
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
  );
}

export default App;
