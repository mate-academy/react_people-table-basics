import React from 'react';
import './HomePage.scss';
import { Route } from 'react-router-dom';

export const HomePage = () => (
  <Route path="/">
    <h2>Home page</h2>
  </Route>
);
