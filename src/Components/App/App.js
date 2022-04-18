import './App.scss';
import Header from '../Header/Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FA1C27',
    },
    secondary: {
      main: '#979797',
    },
    white: {
      main: '#ffffff'
    },
    dark: {
      main: '#343a40'
    }
  },
  typography: {
    allVariants: {
      fontFamily: 'Open-Sans, Akshar, Roboto, sans-serif',
    },
  },
  shape: {
    borderRadius: 2
  },
  spacing: [0, 2, 3, 5, 8],
  transitions: {
    duration: {
      searchbar: 500
    }
  }
});

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
