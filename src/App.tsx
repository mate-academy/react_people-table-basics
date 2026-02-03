import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import PeoplePage from './components/PeoplePage';
import PageNotFound from './components/PageNotFound';

export const App = () => {
  return (
    <>
      <div data-cy="app">
        <NavBar />
        <div className="section">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="people" element={<PeoplePage />} />
              <Route path="people/:slug?" element={<PeoplePage />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="home" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};
