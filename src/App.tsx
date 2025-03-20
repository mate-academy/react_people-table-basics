import { Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './page/HomePage';
import PageNotFound from './page/PageNotFound';
import PeoplePage from './page/PeoplePage';
import { Navigations } from './Components/Navigations';
import { Loader } from './Loader/Loader';
import './App.scss';

export const App = () => {
  const [loading] = useState(false);

  return (
    <div data-cy="app">
      {loading ? (
        <Loader />
      ) : (
        <>
          <main className="section">
            <div className="container">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/people" element={<PeoplePage />} />
                <Route path="/people/:slug" element={<PeoplePage />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
          </main>
        </>
      )}
      <Navigations />
    </div>
  );
};
