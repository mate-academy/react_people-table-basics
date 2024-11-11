import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';

import { Home } from './pages/HomePage';
import { People } from './pages/PeoplePage';
import { Navbar } from './components/Navbar';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace={true} />} />
          <Route path="/people">
            <Route path=":personSlug?" element={<People />} />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);
