import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './Pages/HomePage';
import { PageNotFound } from './Pages/404';
import { PeoplePage } from './Pages/PeoplePage';
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

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>
);
