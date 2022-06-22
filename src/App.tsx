import React from 'react';
import {
  NavLink, Routes, Route, Navigate, useParams,
} from 'react-router-dom';
import './App.scss';
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
      <nav>
        <NavLink
          to="/"
        >
          Home
        </NavLink>
        {' '}
        <NavLink
          to="/people"
        >
          People page
        </NavLink>
      </nav>

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
