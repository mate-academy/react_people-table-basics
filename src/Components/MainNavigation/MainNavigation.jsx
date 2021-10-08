import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './MainNavigation.scss';

export const MainNavigation = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          align="center"
        >
          <NavLink to="/" className="navbar-link">Home Page</NavLink>
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          align="center"
        >
          <NavLink to="/people" className="navbar-link">People Page</NavLink>
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
);
