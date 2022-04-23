import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
      primary: {
        main: '#FA1C27',
      },
      secondary: {
        main: '#979797',
        dark: '#525D66'
      },
      white: {
        main: '#FFFFFF'
      },
      dark: {
        main: '#343A40'
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
    spacing: 2,
    transitions: {
      duration: {
        searchbar: 500
      }
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 580,
        md: 1000,
        lg: 1200,
        xl: 1536,
        tablet: 767
      },
    },
  });