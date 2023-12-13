import {
  Routes,
  Route,
  HashRouter as Router,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/Loader/homePage/HomePage';
import { NotFoundPage } from './components/Loader/NotFoundPage';
import { PeoplePage } from './components/Loader/people/PeoplePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":personSlug?" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
