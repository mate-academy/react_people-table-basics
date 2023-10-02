import { Navigate, Route, Routes } from 'react-router-dom';

import { People } from './pages/People';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

import { NavBar } from './components/NavBar';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <NavBar />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="people">
            <Route index element={<People />} />
            <Route path=":peopleId" element={<People />} />
          </Route>
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </main>
  </div>
);
