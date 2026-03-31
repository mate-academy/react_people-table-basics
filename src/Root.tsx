import {
  HashRouter as Router,
  Route,
  Navigate,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="people/:slug?" element={<PeoplePage />}></Route>
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>
);
