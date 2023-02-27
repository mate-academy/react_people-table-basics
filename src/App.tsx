import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { NavBar } from './components/NavBar/NavBar';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">
        <div className="block">
          <div className="box table-container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFoundPage />} />

              <Route path="people">
                <Route index element={<PeoplePage />} />
                <Route path=":personSlug" element={<PeoplePage />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </main>
  </div>
);
