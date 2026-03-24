import React from 'react';
import {
  Button,
  List,
  ListItem,
  Typography,
  Box,
  IconButton,
  TextField,
  Card,
  Grid,
  CardContent,
  Divider,
  Stack,
  Chip,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useCart } from '../contexts/CartContext';

const CartItem = ({ item, onRemove, onQuantityChange }) => (
  <Card
    variant="outlined"
    sx={{
      mb: 2,
      overflow: 'hidden',
      borderRadius: 5,
      border: '1px solid rgba(83, 120, 73, 0.12)',
      boxShadow: '0 12px 24px rgba(31, 42, 28, 0.05)',
      background: '#fffef9',
      width: '100%',
    }}
  >
    <Grid container>
      <Grid
        item
        xs={4}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#fbf7ee',
          p: 1.5,
        }}
      >
        <img
          src={item.product.imageUrl}
          alt={item.product.title}
          style={{ width: '100%', height: 'auto', maxWidth: '110px' }}
        />
      </Grid>

      <Grid
        item
        xs={8}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardContent sx={{ pb: 1 }}>
          <Typography gutterBottom variant="subtitle1" sx={{ fontWeight: 900 }}>
            {item.product.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {item.product.price} kr / styck
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Chip
              label="vald i korgen"
              size="small"
              sx={{ bgcolor: '#eef6df', fontWeight: 700 }}
            />
          </Stack>
        </CardContent>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ px: 2, pb: 2 }}
        >
          <IconButton color="error" onClick={() => onRemove(item.id)}>
            <DeleteOutlineRoundedIcon />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={() => onQuantityChange(item, -1)}
              disabled={item.quantity <= 1}
            >
              <RemoveIcon />
            </IconButton>

            <TextField
              variant="outlined"
              size="small"
              value={item.quantity}
              onChange={(e) =>
                onQuantityChange(item, parseInt(e.target.value, 10) - item.quantity)
              }
              sx={{
                mx: 1,
                width: 64,
                '& .MuiInputBase-input': { textAlign: 'center' },
              }}
              InputProps={{ inputProps: { min: 1, type: 'number' } }}
            />

            <IconButton onClick={() => onQuantityChange(item, 1)}>
              <AddIcon />
            </IconButton>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  </Card>
);

const Cart = ({ toggleDrawer }) => {
  const { cartItems, removeFromCart, updateCartItem, clearCart } = useCart();

  const handleRemoveFromCart = async (cartItemId) => {
    removeFromCart(cartItemId);
  };

  const handleUpdateQuantity = (item, quantityDelta) => {
    const newQuantity = item.quantity + quantityDelta;
    if (newQuantity > 0) {
      updateCartItem(item.id, newQuantity);
    }
  };

  const calculateTotal = () =>
    cartItems
      .reduce((total, item) => total + item.quantity * item.product.price, 0)
      .toFixed(2);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 440,
        minHeight: '100vh',
        bgcolor: '#fffdf8',
        p: 2.5,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="overline" sx={{ color: '#628045', fontWeight: 900 }}>
            varukorg
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            Dina valda produkter
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {totalItems} artiklar i korgen
          </Typography>
        </Box>

        <IconButton onClick={toggleDrawer}>
          <CloseRoundedIcon />
        </IconButton>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          mt: 2,
          p: 2,
          borderRadius: 4,
          background: 'linear-gradient(90deg, #eef8df 0%, #fff7e7 100%)',
          border: '1px solid rgba(83, 120, 73, 0.12)',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.2}>
          <ShoppingBasketOutlinedIcon sx={{ color: '#5a7f34' }} />
          <Typography variant="body2" color="text.secondary">
            Här kan du ändra antal, ta bort produkter eller tömma hela korgen innan du går vidare.
          </Typography>
        </Stack>
      </Paper>

      <Divider sx={{ my: 2.5 }} />

      <List sx={{ p: 0 }}>
        {cartItems.map((item) => (
          <ListItem key={item.id} disableGutters sx={{ p: 0 }}>
            <CartItem
              item={item}
              onRemove={handleRemoveFromCart}
              onQuantityChange={handleUpdateQuantity}
            />
          </ListItem>
        ))}

        {cartItems.length === 0 && (
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 4,
              textAlign: 'center',
              bgcolor: '#faf8f1',
              border: '1px dashed rgba(83, 120, 73, 0.2)',
            }}
          >
            <Typography sx={{ fontWeight: 800, mb: 0.5 }}>
              Korgen är tom
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Lägg till några produkter så visas de här.
            </Typography>
          </Paper>
        )}
      </List>

      <Box sx={{ mt: 2.5 }}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 4,
            border: '1px solid rgba(83, 120, 73, 0.10)',
            bgcolor: '#ffffff',
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Totalt att betala
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 900 }}>
              {calculateTotal()} kr
            </Typography>
          </Stack>
        </Paper>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            borderRadius: 999,
            backgroundColor: '#5a7f34',
            fontWeight: 800,
            '&:hover': { backgroundColor: '#4d6b2d' },
          }}
          onClick={() => alert('Beställningssteg är inte inkluderat i denna version.')}
        >
          Gå vidare
        </Button>

        {cartItems.length > 0 && (
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1.5, borderRadius: 999, fontWeight: 700 }}
            onClick={() => clearCart()}
          >
            Töm korgen
          </Button>
        )}

        <Button variant="text" fullWidth onClick={toggleDrawer} sx={{ mt: 1 }}>
          Tillbaka till butiken
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;