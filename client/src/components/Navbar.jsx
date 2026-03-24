import React, { useState, useEffect, useMemo } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
  InputBase,
  Badge,
  ListItemIcon,
  Paper,
  Stack,
} from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchIcon from '@mui/icons-material/Search';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import AddProductModal from '../components/AddProductModal';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Cart from './Cart';
import { useProducts } from '../contexts/ProductContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 999,
  backgroundColor: alpha(theme.palette.common.white, 0.92),
  minWidth: 300,
  border: '1px solid rgba(70, 98, 45, 0.12)',
  boxShadow: '0 8px 24px rgba(30, 40, 20, 0.08)',
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1.8),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#617b44',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#2d3a1f',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.25, 1.25, 1.25, 0),
    paddingLeft: `calc(1em + ${theme.spacing(5)})`,
    fontWeight: 500,
  },
}));

const categoryItems = [
  { text: 'Citrus', icon: '/src/assets/icons/icon_citrus.png', category: 'citrus' },
  { text: 'Applen & päron', icon: '/src/assets/icons/icon_applen.png', category: 'applen' },
  { text: 'Bär', icon: '/src/assets/icons/icon_bar.png', category: 'bar' },
  { text: 'Tropiskt', icon: '/src/assets/icons/icon_tropiskt.png', category: 'tropiskt' },
  { text: 'Meloner', icon: '/src/assets/icons/icon_meloner.png', category: 'meloner' },
  { text: 'Stenfrukt', icon: '/src/assets/icons/icon_stenfrukt.png', category: 'stenfrukt' },
  { text: 'Säsongslådor', icon: '/src/assets/icons/icon_sasong.png', category: 'sasong' },
];

const Navbar = () => {
  const { fetchProducts, products } = useProducts();
  const navigate = useNavigate();
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const { cartItemsCount } = useCart();
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
    fetchProducts();
  };

  const toggleDrawer = (drawer, open) => () => {
    if (drawer === 'category') {
      setCategoryDrawerOpen(open);
    } else {
      setCartDrawerOpen(open);
    }
  };

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [products, searchTerm]
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          top: 12,
          mx: { xs: 1, md: 2.5 },
          width: 'auto',
          borderRadius: 6,
          background: 'rgba(255,255,255,0.9)',
          color: '#253118',
          border: '1px solid rgba(92, 122, 63, 0.12)',
          boxShadow: '0 16px 34px rgba(45, 60, 24, 0.08)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar
          sx={{
            minHeight: 92,
            py: 1,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1.5,
            alignItems: 'center',
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ cursor: 'pointer', minWidth: 0 }}
            onClick={() => navigate('/')}
          >
            <Box
           sx={{
           width: 58,
            height: 58,
          borderRadius: '18px',
          bgcolor: '#eef6df',
          border: '1px solid rgba(98, 128, 69, 0.14)',
          display: 'flex',
          alignItems: 'center',
         justifyContent: 'center',
          fontWeight: 900,
         color: '#557a31',
         fontSize: '1.1rem',
        flexShrink: 0,
         }}
>
        FH
       </Box>              

            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="overline"
                sx={{
                  color: '#6b8e23',
                  fontWeight: 900,
                  letterSpacing: 1.2,
                  lineHeight: 1,
                }}
              >
                butik & sortiment
              </Typography> 
                    <Typography
                     variant="h6"
                    sx={{
                    fontWeight: 900,
                    lineHeight: 1.1,
                    whiteSpace: 'nowrap',
                     }}
>
                  FruktHandel
               </Typography>
            </Box>
          </Stack>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ width: { xs: '100%', md: 'auto' }, order: { xs: 3, md: 2 } }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Sök frukter, mixar eller favoriter"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ ml: { md: 1 }, order: { xs: 2, md: 3 } }}
          >
            <Button
              variant="outlined"
              startIcon={<CategoryOutlinedIcon />}
              onClick={toggleDrawer('category', true)}
              sx={{
                borderRadius: 999,
                textTransform: 'none',
                fontWeight: 800,
                borderColor: 'rgba(92, 122, 63, 0.18)',
                color: '#476028',
                px: 2,
              }}
            >
              Kategorier
            </Button>

            <Button
              variant="contained"
              startIcon={<StorefrontOutlinedIcon />}
              endIcon={<ArrowOutwardRoundedIcon />}
              onClick={() => setOpenModal(true)}
              sx={{
                borderRadius: 999,
                textTransform: 'none',
                fontWeight: 800,
                bgcolor: '#6b8e23',
                px: 2.2,
                '&:hover': { bgcolor: '#59761d' },
              }}
            >
              Produktstudio
            </Button>

            <IconButton
              onClick={toggleDrawer('cart', true)}
              sx={{
                width: 48,
                height: 48,
                border: '1px solid rgba(92, 122, 63, 0.16)',
                bgcolor: '#fffdf8',
              }}
            >
              <Badge badgeContent={cartItemsCount} color="error">
                <ShoppingBagOutlinedIcon sx={{ color: '#31411d' }} />
              </Badge>
            </IconButton>

            <IconButton
              onClick={toggleDrawer('category', true)}
              sx={{
                display: { xs: 'inline-flex', md: 'none' },
                width: 48,
                height: 48,
                border: '1px solid rgba(92, 122, 63, 0.16)',
                bgcolor: '#fffdf8',
              }}
            >
              <MenuRoundedIcon sx={{ color: '#31411d' }} />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {searchTerm && (
        <Paper
          sx={{
            mx: { xs: 1.5, md: 3.5 },
            mt: 1.2,
            p: 2,
            borderRadius: 4,
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 900 }}>
            Sökresultat
          </Typography>

          {filteredProducts.length > 0 ? (
            filteredProducts.slice(0, 6).map((product) => (
              <Typography
                key={product.id}
                sx={{
                  cursor: 'pointer',
                  py: 0.8,
                  borderBottom: '1px solid rgba(0,0,0,0.05)',
                  '&:hover': { color: '#5a7f34' },
                }}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                {product.title}
              </Typography>
            ))
          ) : (
            <Typography color="text.secondary">
              Ingen produkt matchade sökningen.
            </Typography>
          )}
        </Paper>
      )}

      <Drawer
        anchor="left"
        open={categoryDrawerOpen}
        onClose={toggleDrawer('category', false)}
      >
        <Box
          sx={{
            width: 320,
            p: 2.5,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(180deg, #fffef9 0%, #f7fbef 100%)',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 900, mb: 0.5 }}>
            Välj kategori
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Gå direkt till den del av sortimentet du vill handla från.
          </Typography>

          <Divider sx={{ mb: 1.5 }} />

          <List>
            {categoryItems.map((item) => (
              <ListItemButton
                key={item.text}
                onClick={() => {
                  navigate(`/category/${item.category}`);
                  setCategoryDrawerOpen(false);
                }}
                sx={{
                  borderRadius: 3,
                  mb: 1,
                  bgcolor: 'rgba(255,255,255,0.7)',
                }}
              >
                <ListItemIcon>
                  <img
                    src={item.icon}
                    alt={item.text}
                    style={{ width: 28, height: 28, objectFit: 'contain' }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  secondary="Öppna kategori"
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      <Drawer anchor="right" open={cartDrawerOpen} onClose={toggleDrawer('cart', false)}>
        <Cart toggleDrawer={toggleDrawer('cart', false)} />
      </Drawer>

      <AddProductModal
        open={openModal}
        handleClose={handleCloseModal}
        onAddProduct={fetchProducts}
      />
    </>
  );
};

export default Navbar;