import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardMedia,
  Typography,
  CircularProgress,
  Breadcrumbs,
  Link,
  TextField,
  Grid,
  Stack,
  Paper,
  Chip,
  Divider,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import {
  getProductById,
  addRatingToProduct,
  getProductRatings,
  getProductAverageRating,
} from '../services/productService';
import ProductRating from './ProductRating';
import RatingsDialog from './RatingsDialog';
import { useCart } from '/src/contexts/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [currentRating, setCurrentRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);
  const { addToCart } = useCart();
  const [ratingsDialogOpen, setRatingsDialogOpen] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const productData = await getProductById(id);
        setProduct(productData);

        const ratingsData = await getProductRatings(id);
        const total = ratingsData.length;
        const sumOfRatings = ratingsData.reduce((acc, rating) => acc + rating.rating, 0);
        const average = total ? sumOfRatings / total : 0;

        setCurrentRating(average);
        setTempRating(average);
        setTotalRatings(total);
        setRatings(ratingsData);
      } catch (error) {
        console.error('Could not fetch product details', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleRatingChange = async (newValue) => {
    setTempRating(newValue);
    try {
      const addResponse = await addRatingToProduct(id, { rating: newValue });
      if (addResponse.message === 'Rating added successfully') {
        const updatedRatingResponse = await getProductAverageRating(id);
        setCurrentRating(parseFloat(updatedRatingResponse.averageRating));
        setRatings((prevRatings) => [...prevRatings, { rating: newValue }]);
        setTotalRatings((prevTotal) => prevTotal + 1);
      } else {
        throw new Error('Invalid response');
      }
      alert('Tack för ditt betyg!');
    } catch (error) {
      console.error('Failed to add rating', error);
      setTempRating(currentRating);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(id, quantity);
      alert('Produkten lades till i varukorgen.');
    } catch (error) {
      console.error('Failed to add product to cart', error);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Typography variant="h5" textAlign="center">
        Produkten kunde inte hittas.
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 1240, mx: 'auto', p: { xs: 2, md: 3 } }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 2 }}
      >
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Hem
        </Link>
        {product.category && (
          <Link
            underline="hover"
            color="inherit"
            component={RouterLink}
            to={`/category/${product.category.name}`}
          >
            {product.category.name}
          </Link>
        )}
        <Typography color="text.primary">{product.title}</Typography>
      </Breadcrumbs>

      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 6,
              height: '100%',
              border: '1px solid rgba(83, 120, 73, 0.12)',
              boxShadow: '0 16px 30px rgba(39, 54, 26, 0.06)',
              background: 'linear-gradient(180deg, #fff8ea 0%, #eef6df 100%)',
              p: 2,
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: '100%',
                height: { xs: 320, md: 460 },
                objectFit: 'contain',
                p: 2,
              }}
              image={
                product.imageUrl.startsWith('http')
                  ? product.imageUrl
                  : `http://localhost:3001${product.imageUrl}`
              }
              alt={product.title}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2.2} sx={{ height: '100%' }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.4,
                borderRadius: 5,
                border: '1px solid rgba(83, 120, 73, 0.12)',
                background: '#fffef9',
              }}
            >
              <Chip
                label={product.category?.name || 'Frukt'}
                sx={{ mb: 1.5, bgcolor: '#eef6df', fontWeight: 800 }}
              />

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  lineHeight: 1.05,
                  mb: 1.2,
                  fontSize: { xs: '2rem', md: '2.8rem' },
                }}
              >
                {product.title}
              </Typography>

              <Typography variant="body1" color="text.secondary">
                {product.description}
              </Typography>
            </Paper>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.2,
                    borderRadius: 4,
                    border: '1px solid rgba(83, 120, 73, 0.12)',
                    background: 'white',
                    height: '100%',
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <InfoOutlinedIcon sx={{ color: '#5a7f34' }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                      Pris
                    </Typography>
                  </Stack>

                  <Typography variant="h4" sx={{ fontWeight: 900 }}>
                    {product.price} kr
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.8 }}>
                    Pris per vald produkt i sortimentet.
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.2,
                    borderRadius: 4,
                    border: '1px solid rgba(83, 120, 73, 0.12)',
                    background: 'white',
                    height: '100%',
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <StarOutlineRoundedIcon sx={{ color: '#5a7f34' }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                      Omdömen
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <ProductRating
                      ratingValue={tempRating}
                      readOnly={false}
                      onRatingChange={handleRatingChange}
                      size="large"
                    />
                    <Typography component="span">
                      {currentRating ? currentRating.toFixed(1) : 'Inget betyg'}
                    </Typography>
                  </Stack>

                  <Link
                    component="button"
                    onClick={() => setRatingsDialogOpen(true)}
                    sx={{ mt: 1, p: 0, minWidth: 0 }}
                  >
                    Visa alla omdömen ({totalRatings})
                  </Link>
                </Paper>
              </Grid>
            </Grid>

            <Paper
              elevation={0}
              sx={{
                p: 2.2,
                borderRadius: 5,
                border: '1px solid rgba(83, 120, 73, 0.12)',
                background: 'linear-gradient(180deg, #fffef9 0%, #f5f9ed 100%)',
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1.5 }}>
                Välj antal och lägg i korgen
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Antal"
                    type="number"
                    InputProps={{ inputProps: { min: 1 } }}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={8}>
                  <Button
                    onClick={handleAddToCart}
                    variant="contained"
                    startIcon={<ShoppingCartOutlinedIcon />}
                    sx={{
                      borderRadius: 999,
                      px: 3,
                      py: 1.3,
                      bgcolor: '#5a7f34',
                      fontWeight: 800,
                      '&:hover': { bgcolor: '#4e6f2e' },
                    }}
                  >
                    Lägg till i varukorg
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      <RatingsDialog
        open={ratingsDialogOpen}
        onClose={() => setRatingsDialogOpen(false)}
        ratings={ratings}
        averageRating={currentRating}
      />
    </Box>
  );
}

export default ProductDetail;