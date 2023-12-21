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
import { Table } from './components/Table';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <Routes>
        <Route
          path="/"
          element={<App />}
        >
          <Route
            path="/"
            element={<h1 className="title">Home Page</h1>}
          />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route
            path="people/:slug?"
            element={
              (
                <>
                  <h1 className="title">People Page</h1>
                  <div className="block">
                    <div className="box table-container">
                      <Outlet />
                    </div>
                  </div>
                </>
              )
            }
          >
            <Route index element={<Table />} />
          </Route>

          <Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          />
        </Route>
      </Routes>
    </Router>,
  );
