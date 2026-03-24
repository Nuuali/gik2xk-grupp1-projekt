import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './views/Home';
import ProductDetail from './components/ProductDetail';
import Layout from './components/Layout';
import { CartProvider } from './contexts/CartContext';
import CategoryPage from './views/CategoryPage';
import Footer from './components/Footer';
import './App.css';
import './index.css';
import { Box } from '@mui/material';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#5a7f34',
      },
      secondary: {
        main: '#f7b042',
      },
      background: {
        default: darkMode ? '#172117' : '#f9f6ef',
        paper: darkMode ? '#1f2c1f' : '#ffffff',
      },
    },
    shape: {
      borderRadius: 16,
    },
    typography: {
      fontFamily: ['Inter', 'Arial', 'sans-serif'].join(','),
    },
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    document.body.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/category/:categoryName" element={<CategoryPage />} />
                </Routes>
              </Layout>
            </Box>
            <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </Box>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
