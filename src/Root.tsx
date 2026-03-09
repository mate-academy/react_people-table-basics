import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { People } from './components/People';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route index element={<HomePage />} />

        <Route path="people">
          <Route path=":personID?" element={<People />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
