import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { PeopleProvider } from './providers/peopleProvider/peopleProvider';
import { App } from './App';
import { HomePage } from './pages/homePage/homePage';
import { PeoplePage } from './pages/peoplePage/peoplePage';
import { NotFoundPage } from './pages/notFoundPage/notFoundPage';
import { RedirectToPerson } from './components/redirectToSlug/redirectToSlug';

export const Root = () => {
  const people = '/people';
  const person = '/person';
  const rootPath = '/';
  const home = '/home';

  return (
    <Router>
      <PeopleProvider>
        <Routes>
          <Route path={rootPath} element={<App />}>
            <Route index element={<HomePage />} />
            <Route path={people} element={<Navigate to={person} replace />} />
            <Route path={`${people}/:slug`} element={<RedirectToPerson />} />
            <Route path={person} element={<PeoplePage />}>
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
            <Route path={home} element={<Navigate to={rootPath} replace />} />
          </Route>
        </Routes>
      </PeopleProvider>
    </Router>
  );
};
