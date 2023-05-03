import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import './App.scss';
import { PeoplePage } from './pages/PeoplePage';
import { HomePage } from './pages/HomePage';
import { UnfoundPage } from './pages/UnfoundPage';
import { MainNav } from './components/MainNav';

export const App = () => {
  return (
    <div data-cy="app">
      <MainNav />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="home" element={<Navigate to="/" replace />} />

            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>

            <Route path="*" element={<UnfoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
