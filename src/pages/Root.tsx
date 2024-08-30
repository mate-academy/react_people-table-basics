import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from '../components/App/App';
import { HomePage } from './HomePage';
import { PeoplePage } from './PeoplePage';
import { NotFoundPage } from './NotFoundPage';
import { URLS } from '../enums/URLS';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path={URLS.home} element={<App />}>
          <Route index element={<HomePage />} />
          <Route
            path={URLS.fakeHome}
            element={<Navigate to={URLS.home} replace />}
          />
          <Route path={URLS.peopleWithSlug} element={<PeoplePage />} />
          <Route path={URLS.pageNotFound} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
