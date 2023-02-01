import { createRoot } from 'react-dom/client';
import {
  HashRouter, Navigate, Route, Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { PeopleTable } from './components/PepopleTable/PeopleTable';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <HashRouter>
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

          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Route>
      </Routes>
    </HashRouter>,
  );
