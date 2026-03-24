import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductAverageRating } from '../services/productService';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
  Button,
  Stack,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ProductRating from './ProductRating';
import { useCart } from '/src/contexts/CartContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [averageRating, setAverageRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    getProductAverageRating(product.id)
      .then((averageRatingData) => {
        const avgRating = parseFloat(averageRatingData.averageRating);
        setAverageRating(avgRating || 0);
      })
      .catch((error) => {
        console.error('Could not fetch product average rating', error);
      });
  }, [product.id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, 1);
      alert('Produkten lades i varukorgen.');
    } catch (error) {
      console.error('Misslyckades att lägga till produkt i varukorgen', error);
      alert('Ett fel uppstod när produkten skulle läggas till i varukorgen.');
    }
  };

  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: 6,
        overflow: 'hidden',
        border: '1px solid rgba(82, 109, 53, 0.10)',
        boxShadow: '0 16px 32px rgba(39, 54, 26, 0.07)',
        background: '#fffef9',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 460,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          px: 2,
          pt: 2,
          pb: 1.5,
          background: 'linear-gradient(180deg, #fff8ea 0%, #f4f8ea 100%)',
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1.5 }}
        >
          <Chip
            label={product.category?.name || 'Frukt'}
            size="small"
            sx={{
              bgcolor: '#eef6df',
              color: '#557a31',
              fontWeight: 800,
            }}
          />

          <IconButton
            aria-label="favorite"
            onClick={() => setIsFavorite((prev) => !prev)}
            sx={{
              bgcolor: 'rgba(255,255,255,0.75)',
              border: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            {isFavorite ? (
              <FavoriteIcon sx={{ color: '#d65a6f' }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </Stack>

        <Box
          onClick={() => navigate(`/products/${product.id}`)}
          sx={{
            height: 220,
            borderRadius: 4,
            bgcolor: '#f4f7ec',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: '1px dashed rgba(82, 109, 53, 0.18)',
          }}
        >
          <Typography sx={{ fontWeight: 800, color: '#557a31' }}>
            Ingen bild
          </Typography>
        </Box>
      </Box>

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.3,
          flexGrow: 1,
          pt: 2,
        }}
      >
        <Stack spacing={0.8}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              lineHeight: 1.15,
              minHeight: 48,
            }}
          >
            {product.title}
          </Typography>

          <Typography
            sx={{
              fontWeight: 900,
              color: '#5a7f34',
              fontSize: '1.15rem',
            }}
          >
            {product.price} kr
          </Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ minHeight: 48 }}>
          {product.description?.slice(0, 95) ||
            'Färsk frukt med tydlig produktinformation.'}
          {product.description?.length > 95 ? '…' : ''}
        </Typography>

        <Box
          sx={{
            mt: 'auto',
            p: 1.3,
            borderRadius: 3,
            bgcolor: '#f8fbf2',
            border: '1px solid rgba(82, 109, 53, 0.08)',
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <ProductRating ratingValue={averageRating} size="small" />
            <Typography variant="body2" color="text.secondary">
              {averageRating ? `${averageRating.toFixed(1)} i snitt` : 'inga betyg ännu'}
            </Typography>
          </Stack>
        </Box>
      </CardContent>

      <Box sx={{ px: 2, pb: 2, pt: 0.5 }}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            onClick={handleAddToCart}
            startIcon={<ShoppingCartIcon />}
            sx={{
              flex: 1,
              borderRadius: 999,
              bgcolor: '#5a7f34',
              fontWeight: 800,
              '&:hover': { bgcolor: '#4e6f2e' },
            }}
          >
            Lägg i korg
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate(`/products/${product.id}`)}
            endIcon={<ArrowOutwardIcon />}
            sx={{
              borderRadius: 999,
              fontWeight: 700,
              borderColor: 'rgba(82, 109, 53, 0.18)',
              color: '#476028',
            }}
          >
            Detaljer
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};

export default ProductCard;