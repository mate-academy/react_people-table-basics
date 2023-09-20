import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';

import { NavBar } from './components/NavBar';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PageNotFound } from './components/PageNotFound';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/people">
              <Route path=":userId?" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
