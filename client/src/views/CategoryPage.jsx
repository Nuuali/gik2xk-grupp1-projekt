import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { useProducts } from '../contexts/ProductContext';
import AddProductModal from '../components/AddProductModal';
import { getCategories } from '../services/productService';
import ProductBreadcrumbs from '../components/ProductBreadcrumbs';
import { Container, Box, Typography, Paper } from '@mui/material';

const normalize = (value = '') =>
  value
    .toLowerCase()
    .replace(/å/g, 'a')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { products, fetchProducts } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [displayCategory, setDisplayCategory] = useState(categoryName);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filterProductsByCategory = async () => {
      const categories = await getCategories();
      const category = categories.find((c) => normalize(c.name) === normalize(categoryName));

      if (category) {
        setDisplayCategory(category.name);
        setFilteredProducts(products.filter((product) => product.categoryId === category.id));
      } else {
        console.error(`Category ${categoryName} not found`);
        setFilteredProducts([]);
      }
    };

    filterProductsByCategory();
  }, [categoryName, products]);

  const handleCloseModal = () => {
    setOpenModal(false);
    fetchProducts();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ pb: 2 }}>
        <ProductBreadcrumbs category={displayCategory.charAt(0).toUpperCase() + displayCategory.slice(1)} />
      </Box>

      <Paper sx={{ p: 3, borderRadius: 4, mb: 3, background: 'linear-gradient(90deg, #fffaf0 0%, #eef8df 100%)', border: '1px solid rgba(0,0,0,0.06)' }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {displayCategory.charAt(0).toUpperCase() + displayCategory.slice(1)}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {filteredProducts.length} produkter i denna kategori.
        </Typography>
      </Paper>

      <ProductGrid products={filteredProducts} emptyMessage="Den här kategorin är tom just nu." />
      <AddProductModal open={openModal} handleClose={handleCloseModal} onAddProduct={fetchProducts} />
    </Container>
  );
};

export default CategoryPage;
