import React from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';
import { Box, Typography } from '@mui/material';

const ProductGrid = ({ products = [], emptyMessage = 'Inga produkter hittades.' }) => {
  if (!products.length) {
    return (
      <Box
        sx={{
          p: 3,
          borderRadius: 4,
          border: '1px dashed rgba(0,0,0,0.18)',
          backgroundColor: 'rgba(255,255,255,0.55)',
        }}
      >
        <Typography color="text.secondary">{emptyMessage}</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2.5}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex' }}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
