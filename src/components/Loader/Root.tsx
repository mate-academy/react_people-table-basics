import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { HomePage } from './HomePage';
import { NotFoundPage } from './NotFoundPage';
import { PeoplePage } from './PeoplePage';
import { App } from '../../App';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="people" element={<PeoplePage />}>
            <Route path=":slug" element={<PeoplePage />} />
          </Route>

          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <App />
    </Router>
  );
};
