import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PageNotFound } from './components/PageNotFound';

export const Root = () => (
  <Router>
    <Routes>
      <Route
        path="/home"
        element={<Navigate to="/" replace />}
      />

      <Route
        path="/"
        element={<App />}
      >
        <Route index path="/" element={<HomePage />} />

        <Route path="people" element={<PeoplePage />}>
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>
);
