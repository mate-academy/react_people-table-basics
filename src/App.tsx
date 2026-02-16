import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
import { Navigation } from './components/Navigation';
import { Peoples } from './pages/Peoples';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<h1 className="title">Home Page</h1>}
          ></Route>
          <Route path="/people">
            <Route index element={<Peoples />}></Route>
            <Route path=":slug" element={<Peoples />}></Route>
          </Route>
          <Route path="/home" element={<Navigate to="/" replace />}></Route>
          <Route
            path="/*"
            element={<h1 className="title">Page not found</h1>}
          ></Route>
        </Routes>
      </div>
    </main>
  </div>
);
