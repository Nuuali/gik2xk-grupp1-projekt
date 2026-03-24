import React, { useState, useEffect, useMemo } from 'react';
import ProductGrid from '../components/ProductGrid';
import AddProductModal from '../components/AddProductModal';
import { useProducts } from '../contexts/ProductContext';
import { Box, Typography, Container, Paper, Stack, Chip, Button } from '@mui/material';
import { getProductAverageRating } from '../services/productService';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

const InfoCard = ({ icon, title, text }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      borderRadius: 4,
      border: '1px solid rgba(83, 120, 73, 0.12)',
      background: '#fffdf7',
      minHeight: 150,
    }}
  >
    <Box sx={{ color: '#6b8e23', mb: 1 }}>{icon}</Box>
    <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {text}
    </Typography>
  </Paper>
);

const SectionHeader = ({ eyebrow, title, text }) => (
  <Box sx={{ mb: 2 }}>
    <Typography
      variant="overline"
      sx={{ color: '#5a7f34', fontWeight: 800, letterSpacing: 1.3 }}
    >
      {eyebrow}
    </Typography>
    <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5 }}>
      {title}
    </Typography>
    <Typography color="text.secondary">{text}</Typography>
  </Box>
);

const Home = () => {
  const { products, fetchProducts } = useProducts();
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [seasonBoxes, setSeasonBoxes] = useState([]);
  const [quickPicks, setQuickPicks] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const calculateHighlights = async () => {
      const productsWithRatings = await Promise.all(
        products.map(async (product) => {
          try {
            const averageRatingData = await getProductAverageRating(product.id);
            const averageRating = averageRatingData.averageRating || 0;
            return { ...product, averageRating };
          } catch (error) {
            console.error(
              `Kunde inte hämta genomsnittsbetyg för produkt ${product.title}:`,
              error
            );
            return { ...product, averageRating: 0 };
          }
        })
      );

      const sortedProducts = productsWithRatings
        .filter((product) => product.averageRating > 0)
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 8);

      setTopRatedProducts(sortedProducts);

      setSeasonBoxes(
        products
          .filter(
            (product) =>
              product.title?.toLowerCase().includes('låda') ||
              product.title?.toLowerCase().includes('mix')
          )
          .slice(0, 4)
      );

      setQuickPicks(products.slice(0, 6));
    };

    if (products.length > 0) {
      calculateHighlights();
    }
  }, [products]);

  const handleCloseModal = () => {
    setOpenModal(false);
    fetchProducts();
  };

  const infoCards = useMemo(
    () => [
      {
        icon: <SpaOutlinedIcon fontSize="large" />,
        title: 'Säsong först',
        text: 'Startsidan prioriterar utvalda frukter och snabba val i stället för en traditionell standardöversikt.',
      },
      {
        icon: <FavoriteBorderOutlinedIcon fontSize="large" />,
        title: 'Betyg som stöd',
        text: 'Topprankade produkter lyfts fram så att kunden snabbare kan hitta det mest uppskattade sortimentet.',
      },
      {
        icon: <LocalOfferOutlinedIcon fontSize="large" />,
        title: 'Tydligare urval',
        text: 'Mixlådor, snabbval och favoriter är uppdelade i egna block för att göra butiken mer lättläst.',
      },
      {
        icon: <Inventory2OutlinedIcon fontSize="large" />,
        title: 'Funktionerna kvar',
        text: 'Produktdetaljer, rating, varukorg och produktadministration finns kvar även med ny startsidesstruktur.',
      },
    ],
    []
  );

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 6,
          mb: 4,
          border: '1px solid rgba(83, 120, 73, 0.12)',
          background: 'linear-gradient(135deg, #f5fbec 0%, #fff8eb 50%, #eef7ff 100%)',
          overflow: 'hidden',
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography
              variant="overline"
              sx={{ color: '#5a7f34', fontWeight: 900, letterSpacing: 1.5 }}
            >
              frukthörnan
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2rem', md: '3.2rem' },
                lineHeight: 1.05,
                mb: 1.5,
              }}
            >
              Fräschare startsida
              <br />
              tydligare butikskänsla
            </Typography>
            <Typography
              sx={{
                maxWidth: 760,
                color: 'text.secondary',
                fontSize: { xs: '1rem', md: '1.08rem' },
              }}
            >
              Här möts kunden direkt av utvalda frukter, populära favoriter och
              färdiga mixar. Målet är att göra butiken mer egen, mer lättnavigerad
              och snabbare att använda.
            </Typography>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
            <Chip label="snabbval" sx={{ bgcolor: '#eef8df', fontWeight: 700 }} />
            <Chip label="topprankat" sx={{ bgcolor: '#fff2d9', fontWeight: 700 }} />
            <Chip label="mixlådor" sx={{ bgcolor: '#eaf1ff', fontWeight: 700 }} />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant="contained"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                bgcolor: '#6b8e23',
                borderRadius: 999,
                px: 3,
                py: 1.2,
                '&:hover': { bgcolor: '#59761d' },
              }}
            >
              Utforska sortimentet
            </Button>

            <Button
              variant="outlined"
              sx={{
                borderRadius: 999,
                px: 3,
                py: 1.2,
                borderColor: 'rgba(83, 120, 73, 0.25)',
                color: '#49652a',
              }}
            >
              Se favoriter
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 2,
          mb: 5,
        }}
      >
        {infoCards.map((card) => (
          <InfoCard key={card.title} {...card} />
        ))}
      </Box>

      <Box sx={{ mb: 5 }}>
        <SectionHeader
          eyebrow="populärt just nu"
          title="Kundernas favoriter"
          text="Produkter med högst snittbetyg visas först för att hjälpa kunden välja snabbare."
        />
        <ProductGrid products={topRatedProducts} emptyMessage="Inga betyg satta ännu." />
      </Box>

      <Box sx={{ mb: 5 }}>
        <SectionHeader
          eyebrow="handla direkt"
          title="Snabba val för veckan"
          text="Ett direkt urval av produkter för dig som vill lägga i varukorgen utan extra steg."
        />
        <ProductGrid
          products={quickPicks}
          emptyMessage="Inga produkter kunde visas just nu."
        />
      </Box>

      <Box sx={{ mb: 5 }}>
        <SectionHeader
          eyebrow="färdiga alternativ"
          title="Mixlådor och kombinationer"
          text="Här samlas lådor och mixpaket i ett eget block för att skilja dem från vanliga produkter."
        />
        <ProductGrid products={seasonBoxes} emptyMessage="Inga mixpaket hittades." />
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 5,
          background: 'linear-gradient(90deg, #eef8df 0%, #fff8e7 100%)',
          border: '1px solid rgba(107, 142, 35, 0.15)',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>
          En mer egen butiksvy
        </Typography>
        <Typography color="text.secondary">
          Den här versionen lyfter fram snabbare vägval, tydligare sektioner och
          ett nytt startsideflöde, samtidigt som kärnfunktionerna i projektet är kvar.
        </Typography>
      </Paper>

      <AddProductModal
        open={openModal}
        handleClose={handleCloseModal}
        onAddProduct={fetchProducts}
      />
    </Container>
  );
};

export default Home;