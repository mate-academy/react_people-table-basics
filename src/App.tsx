import { Navigate, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import PeoplePage from './pages/PeoplePage/PeoplePage';
import HomePage from './pages/HomePage/HomePage';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Header />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" />} />
          <Route path="/people" element={<PeoplePage />}>
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);
