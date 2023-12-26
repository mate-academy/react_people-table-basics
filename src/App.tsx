import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import './App.scss';

import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { PageNotFound } from './components/PageNotFound';

const navList = [
  {
    href: '/',
    title: 'Home',
  },
  {
    href: '/people',
    title: 'People',
  },
];

export const App = () => (
  <div className="App" data-cy="app">
    <Header navList={navList} />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="people">
        <Route index element={<PeoplePage />} />
        <Route path=":slug" element={<PeoplePage />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </div>
);
