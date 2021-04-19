import React from 'react';
import './PeoplePage.scss';
import { Route } from 'react-router-dom';

export const NotFoundPage = () => (
  <Route path="/people">
    <h2>Page Not Found</h2>
  </Route>
);
