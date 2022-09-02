import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { HomePage } from './components/Loader/HomePage/HomePage';
import { NotFoundPage } from './components/Loader/NotFoundPage/NotFoundPage';
import { Navbar } from './components/Loader/Navbar/Navbar';
import { PeoplePage } from './components/Loader/PeoplePage/PeoplePage';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route
            path="people"
            element={(
              <>
                <h1 className="title">People Page</h1>
                <PeoplePage />
              </>
            )}
          >
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </div>
    </main>
  </div>
);
