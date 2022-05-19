import * as React from 'react';

import { AuthProvider } from '../contexts/AuthContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import { LoadingProvider } from "../contexts/LoadingContext";
import { WishListProvider } from "../contexts/WishListContext";
import { ShoppingCartProvider } from "../contexts/ShoppingCartContext";

import { theme } from '../config/theme';

import { ThemeProvider, StyledEngineProvider } from '../mui-imports';

import Content from '../_Content/Content';

import './App.scss';

function App() {

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          {
            <NotificationProvider>
              <WishListProvider>
                <ShoppingCartProvider>
                  <LoadingProvider>
                    <Content />
                  </LoadingProvider>
                </ShoppingCartProvider>
              </WishListProvider>
            </NotificationProvider>
          }
        </StyledEngineProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
