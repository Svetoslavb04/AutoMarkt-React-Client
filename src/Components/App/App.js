import './App.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../config/theme';
import { Routes, Route } from 'react-router-dom';
import Home from '../../Pages/Home/Home';
import Login from '../../Pages/Login/Login';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className="content-wrapper">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
