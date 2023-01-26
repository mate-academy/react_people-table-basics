import { createRoot } from 'react-dom/client';
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            path="*"
            element={<NotFoundPage />}
          />

          <Route
            index
            element={<HomePage />}
          />

          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":selectedUser" element={<PeoplePage />} />
          </Route>

          <Route
            path="home"
            element={<Navigate to="/" replace />}
          />
        </Route>
      </Routes>
    </HashRouter>,
  );
