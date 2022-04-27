import './App.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../config/theme';
import Home from '../../Pages/Home/Home';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <Home />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
