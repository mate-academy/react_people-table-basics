import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';

import { HomePage } from './components/pages/HomePage';
import { ErrorPage } from './components/pages/ErrorPage';
import { PeoplePage } from './components/pages/PeoplePage';
import { NavbarComponent } from './components/NavbarComponent/NavbarComponent';

export const App = () => {
  return (
    <div data-cy="app">
      <NavbarComponent />

      <main className="section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="people">
            <Route
              path=":slug?"
              element={(<PeoplePage />)}
            />
          </Route>

          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </div>
  );
};
