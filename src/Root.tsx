import {
  Route,
  Routes,
  HashRouter as Router,
  Navigate,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PersonPage';
import { NotFound } from './pages/NotFoundPage';
import { App } from './App';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/home" element={<Navigate to="/" replace/>} />
        <Route index element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />}>
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Router>
);
