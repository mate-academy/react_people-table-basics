// import { Route } from 'react-router-dom';

import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Navigation } from './components/Navigation';
import { PeoplePage } from './page/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <Navigation />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<h1 className="title">Home Page</h1>} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);
