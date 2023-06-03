import { createRoot } from 'react-dom/client';
import {
  Navigate,
  Outlet,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <Routes>
        <Route path="/" element={<App />}>

          <Route
            path="*"
            element={
              <h1 className="title">Page not found</h1>
            }
          />

          <Route
            path="/home"
            element={<Navigate to="/" replace />}
          />

          <Route
            index
            element={<HomePage />}
          />

          <Route
            path="/people"
            element={(
              <>
                <h1 className="title">People Page</h1>
                <Outlet />
              </>
            )}
          >
            <Route index element={<PeoplePage />} />
            <Route path=":userUrl" element={<PeoplePage />} />
          </Route>

        </Route>
      </Routes>

    </Router>,
  );
