import { createRoot } from 'react-dom/client';
import {
  HashRouter as Router, Route, Routes, Navigate,
} from 'react-router-dom';

import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { HomePage } from './pages/HomePage/HomePage';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { PeopleTable } from './components/PeopleTable/PeopleTable';
import { App } from './App';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="people">
            <Route
              index
              element={(
                <>
                  <PeoplePage />
                  <PeopleTable />
                </>
              )}
            />

            <Route
              path=":slug"
              element={(
                <>
                  <PeoplePage />
                  <PeopleTable />
                </>
              )}
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>,
  );
