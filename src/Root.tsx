import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ErrorPage } from './components';
import { App } from './App';
import { HomePage } from './components';
import { PeoplePage } from './components';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
      </Route>
    </Routes>
  </Router>
);
