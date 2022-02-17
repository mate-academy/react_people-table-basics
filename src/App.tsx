import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';
import 'bulma';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { Header } from './components/Header';
import { PageNotFound } from './components/PageNotFound';

const App: React.FC = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="people" element={<PeoplePage />} />
      <Route path="home" element={<Navigate replace to="/" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </>
);

export default App;
