import React, { StrictMode, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { router } from './routes';
import './index.css';

const ThemedApp = () => {
  const { themeMode } = useApp();

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: themeMode,
        primary: {
          main: themeMode === 'dark' ? '#FFFFFF' : '#000000',
          dark: themeMode === 'dark' ? '#E4E4E7' : '#27272A',
          light: themeMode === 'dark' ? '#F4F4F5' : '#52525B',
        },
        background: {
          default: themeMode === 'dark' ? '#09090B' : '#FAFAF9',
          paper: themeMode === 'dark' ? '#18181B' : '#FFFFFF',
          card: themeMode === 'dark' ? '#27272A' : '#F4F4F5',
        },
        text: {
          primary: themeMode === 'dark' ? '#F4F4F5' : '#09090B',
          secondary: themeMode === 'dark' ? '#A1A1AA' : '#52525B',
        },
        divider: themeMode === 'dark' ? '#27272A' : '#E4E4E7',
      },
      typography: {
        fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
        fontSize: 15.5,
        body1: {
          fontSize: "1.05rem",
          lineHeight: 1.6
        },
        body2: {
          fontSize: "0.95rem",
          lineHeight: 1.6
        },
        caption: {
          fontSize: "0.85rem",
          lineHeight: 1.5
        },
        button: {
          fontSize: "0.9rem"
        }
      },
    });
  }, [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AppProvider>
        <ThemedApp />
      </AppProvider>
    </AuthProvider>
  </StrictMode>,
);
