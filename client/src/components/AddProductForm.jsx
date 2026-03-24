import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
  Typography,
  Stack,
  Divider,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  createProduct,
  getProductList,
  updateProduct,
  deleteProduct,
} from '../services/productService';
import { getCategories } from '../services/categoryService';

const AddProductForm = ({ handleClose, onAddProduct }) => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    categoryId: '',
    image: '',
  });
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageType, setImageType] = useState('url');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };

    const fetchProducts = async () => {
      const productList = await getProductList();
      setProducts(productList);
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleProductChange = async (e) => {
    const productId = e.target.value;
    setSelectedProductId(productId);

    const productToEdit = products.find((p) => p.id === productId);

    if (productToEdit) {
      setProduct({
        title: productToEdit.title,
        description: productToEdit.description,
        price: productToEdit.price,
        categoryId: productToEdit.categoryId,
        image: productToEdit.image || '',
      });
      setImageType(productToEdit.image ? 'url' : 'upload');
    } else {
      setProduct({
        title: '',
        description: '',
        price: '',
        categoryId: '',
        image: '',
      });
      setSelectedFile(null);
      setSelectedFileName('');
      setImageType('url');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (imageType === 'upload' && file) {
      setSelectedFile(file);
      setSelectedFileName(file.name);
    } else {
      handleChange(e);
    }
  };

  const handleRemoveSelectedFile = () => {
    setSelectedFile(null);
    setSelectedFileName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });

    if (selectedFile && imageType === 'upload') {
      formData.append('image', selectedFile);
    }

    try {
      const newProduct = await createProduct(formData);
      onAddProduct(newProduct);
      alert('Produkten skapades.');
      handleClose();
    } catch (error) {
      console.error('Fel vid tillägg av produkt:', error.response || error);
      alert('Det gick inte att skapa produkten.');
    }
  };

  const handleUpdateProduct = async () => {
    const formData = new FormData();

    Object.keys(product).forEach((key) => {
      if (product[key] != null && product[key] !== '') {
        formData.append(key, product[key]);
      }
    });

    if (imageType === 'upload' && selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      await updateProduct(selectedProductId, formData);
      alert('Produkten uppdaterades.');
      handleClose();
    } catch (error) {
      console.error('Fel vid uppdatering av produkt:', error);
      alert('Det gick inte att uppdatera produkten.');
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(selectedProductId);
      alert('Produkten togs bort.');
      handleClose();
    } catch (error) {
      console.error('Fel vid borttagning av produkt:', error);
      alert('Det gick inte att ta bort produkten.');
    }
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title" sx={{ pb: 1.2 }}>
        Produktstudio
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Skapa nya produkter eller uppdatera befintliga poster i sortimentet.
        </Typography>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack
          spacing={2.2}
          component="form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          sx={{ pt: 1 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 4,
              background: 'linear-gradient(180deg, #fffdf7 0%, #eef6df 100%)',
              border: '1px solid rgba(83, 120, 73, 0.12)',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
              Arbeta med sortimentet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Välj först om du vill utgå från en befintlig produkt eller skapa en helt ny.
            </Typography>
          </Paper>

          <Stack spacing={1.5}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
              1. Välj produktläge
            </Typography>

            <FormControl fullWidth margin="dense" variant="outlined">
              <InputLabel id="product-select-label" shrink>
                Befintlig produkt
              </InputLabel>
              <Select
                labelId="product-select-label"
                id="product-select"
                value={selectedProductId}
                onChange={handleProductChange}
                displayEmpty
                label="Befintlig produkt"
              >
                <MenuItem value="">
                  <em>Skapa ny produkt</em>
                </MenuItem>
                {products.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Divider />

          <Stack spacing={1.5}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
              2. Grunduppgifter
            </Typography>

            <TextField
              label="Produktnamn"
              name="title"
              value={product.title}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />

            <TextField
              label="Beskrivning"
              name="description"
              value={product.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              margin="dense"
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <TextField
                label="Pris"
                name="price"
                value={product.price}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />

              <FormControl fullWidth margin="dense">
                <InputLabel id="category-label">Kategori</InputLabel>
                <Select
                  labelId="category-label"
                  name="categoryId"
                  value={product.categoryId}
                  label="Kategori"
                  onChange={handleChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Stack>

          <Divider />

          <Stack spacing={1.5}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
              3. Bild och visning
            </Typography>

            <FormControl component="fieldset">
              <RadioGroup
                row
                value={imageType}
                onChange={(e) => setImageType(e.target.value)}
              >
                <FormControlLabel value="url" control={<Radio />} label="Ange bild-URL" />
                <FormControlLabel value="upload" control={<Radio />} label="Ladda upp fil" />
              </RadioGroup>
            </FormControl>

            {imageType === 'url' ? (
              <TextField
                label="Bildadress"
                name="image"
                value={product.image}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
            ) : (
              <Box>
                <Button variant="outlined" component="label" sx={{ borderRadius: 999 }}>
                  Välj bildfil
                  <input hidden type="file" onChange={handleImageChange} />
                </Button>

                {selectedFileName && (
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                    <Typography variant="body2">Vald fil: {selectedFileName}</Typography>
                    <Button size="small" color="error" onClick={handleRemoveSelectedFile}>
                      Ta bort
                    </Button>
                  </Stack>
                )}
              </Box>
            )}
          </Stack>

          <Divider />

          <Stack spacing={1.2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
              4. Spara åtgärd
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
              <Button
                type="submit"
                variant="contained"
                sx={{ borderRadius: 999, flex: 1, fontWeight: 800 }}
              >
                Skapa produkt
              </Button>

              <Button
                type="button"
                variant="outlined"
                onClick={handleUpdateProduct}
                disabled={!selectedProductId}
                sx={{ borderRadius: 999, flex: 1, fontWeight: 700 }}
              >
                Uppdatera vald
              </Button>

              <Button
                type="button"
                variant="outlined"
                color="error"
                onClick={handleDeleteProduct}
                disabled={!selectedProductId}
                sx={{ borderRadius: 999, flex: 1, fontWeight: 700 }}
              >
                Ta bort vald
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductForm;