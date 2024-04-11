import { Navigate, Route, Routes } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { Navbar } from './components/Navbar';
import { PageNotFound } from './pages/PageNotFound';
import { PeoplePage } from './pages/People';

import './App.scss';

export const App = () => {
  return (
    <>
      <div data-cy="app">
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route index element={<HomePage />} />
            <Route path="people">
              <Route path=":slug?" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};
