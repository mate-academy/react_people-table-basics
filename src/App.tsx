import React from 'react';
import {
  Routes, Route, Navigate, useParams,
} from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { HomePage } from './components';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/PageNotFound/PageNotFound';

const Redirect = () => {
  const { type } = useParams();

  return (
    <>
      <h2>{type}</h2>
      {type?.includes('home')
      && <Navigate to="/" replace />}
    </>
  );
};

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path=":type" element={<Redirect />} />
      </Routes>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </div>
  );
};
