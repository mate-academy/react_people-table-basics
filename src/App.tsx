import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
import { NavBar } from './components/NavBar';
import { PeoplesPage } from './components/PeoplesPage';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <Routes>
        <Route path="*" element={<p>Page not found</p>} />
        <Route path="/" element={<h1 className="title">Home Page</h1>} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="/people" element={<PeoplesPage />}>
          <Route path=":slug" element={<PeoplesPage />} />
        </Route>
      </Routes>
    </main>
  </div>
);
