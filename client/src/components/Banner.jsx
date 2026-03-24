
import React from 'react';
import { Box, Button, Typography, Stack, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import bannerImage from '../assets/banner-fruit.png';

const Banner = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 330, md: 390 },
        borderRadius: 7,
        overflow: 'hidden',
        backgroundImage: `linear-gradient(110deg, rgba(30,49,21,0.78) 0%, rgba(50,82,31,0.62) 34%, rgba(246,177,70,0.08) 100%), url(${bannerImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        p: { xs: 3, md: 5 },
        display: 'flex',
        alignItems: 'flex-end',
        boxShadow: '0 24px 38px rgba(56, 73, 33, 0.16)',
      }}
    >
      <Stack spacing={2} sx={{ position: 'relative', zIndex: 2, maxWidth: 640, color: 'white' }}>
        <Chip label="Fruktlådor, styckvis och favoriter" sx={{ width: 'fit-content', bgcolor: 'rgba(255,255,255,0.14)', color: 'white', fontWeight: 700 }} />
        <Typography variant="h2" sx={{ fontSize: { xs: '2.25rem', md: '3.6rem' }, fontWeight: 900, lineHeight: 1.02 }}>
          Handla frukt efter humör, säsong och smak
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 560, opacity: 0.97 }}>
          FruktHörnan samlar betygsatta favoriter, färdiga mixar och tydliga kategorier i en mer egen butiksvy med snabbare väg från startsida till varukorg.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <Button component={Link} to="/category/sasong" variant="contained" sx={{ bgcolor: '#f7b042', color: '#27361a', fontWeight: 800, px: 2.4, '&:hover': { bgcolor: '#ffd089' } }}>
            Se säsongslådor
          </Button>
          <Button component={Link} to="/category/bar" variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.76)', px: 2.4 }}>
            Utforska bärriket
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Banner;
