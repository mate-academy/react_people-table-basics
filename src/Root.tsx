import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { PageNotFound } from './components/PageNotFound';
import { Peoples } from './components/Peoples';
import { HomePage } from './components/HomePage';
import { PeopleProvider } from './context/PeopleProvider';

export const Root = () => (
  <PeopleProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people">
            <Route index element={<Peoples />} />
            <Route path=":slug?" element={<Peoples />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  </PeopleProvider>
);
