import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { createRoot } from 'react-dom/client';
import { App } from './App';
import { PeoplePage } from './PeoplePage';
import { HomePage } from './HomePage';
import {
  Routes,
  Route,
  HashRouter as Router,
  Navigate,
} from 'react-router-dom';
import { ErrorPage } from './ErrorPage';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":personId" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  </Router>,
);
