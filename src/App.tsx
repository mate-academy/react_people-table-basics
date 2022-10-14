import './App.scss';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { Home } from './pages/Home';
import PeoplePage from './pages/PeoplePage/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import Navbar from './components/Navbar';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people" element={<PeoplePage />} />
          <Route path="people/:slug" element={<PeoplePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
