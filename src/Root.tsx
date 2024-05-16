import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { NotFoundPage } from './components/NotFoundPage';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PeopleTable } from './components/PeopleTable';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people" element={<PeoplePage />}>
          <Route index element={<PeopleTable />} />
          <Route path=":slug" element={<PeopleTable />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
