import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import MyMap from './components/MyMap';
import MyMap2 from './components/MyMap2';
import MapOpenLayers from './components/MapOpenLayers';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:5173/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
  return (
    <Container maxWidth="xl" sx={{ padding: '9px'}}>
      <Box sx={{ my: 4 , display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Typography variant="h4" component="h1" gutterBottom>
        Open Layers map's example
        </Typography>
        < MapOpenLayers/>
        <Copyright />
      </Box>
    </Container>
  );
}
