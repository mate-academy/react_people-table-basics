import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PeopleContextProvider } from './contexts/PeopleContext';
import { PageNotFound } from './pages/PageNotFound';
import { App } from './App';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';

export const Root = () => {
  return (
    <Router>
      <App />
      <Routes>
        <Route path="/home" element={<Navigate to="/" replace />} />

        <Route path="/">
          <Route index element={<HomePage />} />

          <Route path="people">
            <Route
              path=":personSlug?"
              element={(
                <PeopleContextProvider>
                  <PeoplePage />
                </PeopleContextProvider>
              )}
            />

          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};
