import React from 'react';
import { Box, Typography, Container, Switch, Stack, Divider, Chip } from '@mui/material';

const Footer = ({ darkMode, toggleDarkMode }) => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 7,
        borderTop: '1px solid rgba(0,0,0,0.08)',
        background: 'linear-gradient(180deg, #fffdf7 0%, #f2f8e8 100%)',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4.5 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          justifyContent="space-between"
        >
          <Box sx={{ maxWidth: 500 }}>
            <Chip
              label="fruktbutik"
              size="small"
              sx={{
                mb: 1.4,
                bgcolor: '#eef6df',
                color: '#557a31',
                fontWeight: 800,
              }}
            />

            <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
              Färska val, enklare butikskänsla
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Den här versionen fokuserar på ett tydligare fruktsortiment,
              snabbare väg till produkter och en enklare struktur för varukorg,
              kategorier och produktadministration.
            </Typography>
          </Box>

          <Stack spacing={1.2} alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
              Anpassa vyn
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Typography variant="body2">Mörkt läge</Typography>
              <Switch checked={darkMode} onChange={toggleDarkMode} />
            </Stack>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2.5 }} />

        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} FruktHandel · lokal webbshop för frukt och mixlådor
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;