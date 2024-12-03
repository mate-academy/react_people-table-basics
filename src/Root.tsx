import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './Pages/HomePage';
import { PeoplePage } from './Pages/PeoplePage';
import { PageNotFound } from './Pages/PageNotFound';
import { PeopleProvider } from './store/PeopleContext';

export const Root = () => (
  <Router>
    <PeopleProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route index element={<HomePage />} />
          <Route path="people" element={<PeoplePage />}>
            <Route index element={<PeoplePage />} />
            <Route path=":slug?" />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </PeopleProvider>
  </Router>
);
