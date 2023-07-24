import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Page } from './Page';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { ErrorPage } from './pages/ErrorPage';

export const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Page />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":selectedPerson" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  </Router>
);
