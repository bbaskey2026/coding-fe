import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { router } from './routes';
import './index.css';

// Create a custom MUI theme matching the project's light-gold design tokens
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#B8860B',       // Dark Gold (readable on white)
      dark: '#996515',       // Deep Gold
      light: '#D4AF37',      // Bright Gold
    },
    background: {
      default: '#FFFFFF',    // White background
      paper: '#FFFFFF',      // White surface
      card: '#F4F4F5',       // Light gray card surface
    },
    text: {
      primary: '#000000',    // Black text
      secondary: '#52525B',  // Dark gray text
    },
    divider: '#E4E4E7',      // Light gray dividers
  },
  typography: {
    fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
    fontSize: 15.5, // Increase baseline font size
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
