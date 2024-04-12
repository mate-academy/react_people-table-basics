import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import { PeopleTable } from './PeopleTable';
import { App } from './App';
import { HomePage } from './HomePage';

export const Root = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people">
              <Route index element={<PeopleTable />} />
              <Route path=":personSlug?" element={<PeopleTable />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};
