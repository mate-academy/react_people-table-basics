import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage, PeoplePage, NotFoundPage } from './pages';
import { Paths } from './types';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path={Paths.HOME} element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to=".." replace />} />

          <Route path={Paths.PEOPLE}>
            <Route index element={<PeoplePage />} />
            <Route path={Paths.PERSON} element={<PeoplePage />} />
          </Route>

          <Route path={Paths.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
