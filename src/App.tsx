import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';
import NotFoundPage from './pages/NotFoundPage';
import { HashRouter as Router } from 'react-router-dom';

export const App = () => (
  <div data-cy="app">
    <main className="section">
      <div className="container">
        <Router>
          <Navbar />
          <Routes>
            <Route index element={<HomePage />} />
            <Route path={'/'} element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path={'people'}>
              <Route index element={<PeoplePage />} />
              <Route path={':slug'} element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </div>
    </main>
  </div>
);
