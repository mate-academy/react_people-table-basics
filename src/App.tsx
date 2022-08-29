import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.css';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Navigation } from './components/Navigation/Navigation';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <Navigation />

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
