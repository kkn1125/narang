import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Layout from './components/templates/Layout';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />}/>
        <Route path="about" element={<About />}/>
      </Route>
    </Routes>
    
  );
}
