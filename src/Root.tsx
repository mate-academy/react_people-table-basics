import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { PeopleTable } from './components/PeopleTable';
import { NoFoundPage } from './pages/NoFoundPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to={'/'} replace />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":personSlug?" element={<PeopleTable />} />
        </Route>
        <Route path="*" element={<NoFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
