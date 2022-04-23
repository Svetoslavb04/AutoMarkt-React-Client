import './App.scss';
import Header from '../Header/Header';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../config/theme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    </div>
  );
}

export default App;
