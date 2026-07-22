import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { router } from './routes';
import './index.css';

// Create a custom MUI theme matching the project's dark-gold design tokens
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D4AF37',       // Rich Gold
      dark: '#B8860B',       // Dark Gold
      light: '#FFD700',      // Bright Gold
    },
    background: {
      default: '#000000',    // Black background
      paper: '#111111',      // Surface gray
      card: '#1A1A1A',       // Custom card gray
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#CFCFCF',
    },
    divider: '#2C2C2C',
  },
  typography: {
    fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
