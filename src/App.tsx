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

        {/* <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>

        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p> */}
      </div>
    </main>
  </div>
);
