import { createRoot } from 'react-dom/client';
import {
  HashRouter as Router, Navigate, Route, Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { HomePage } from './components/HomePage/HomePage';
import { PeopleTable } from './components/PeopleTable/PeopleTable';
import { NotFounfPage } from './components/NotFoundPage/NotFoundPage';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            element={<HomePage />}
          />
          <Route
            path="people"
            element={<PeopleTable />}
          />
          <Route
            path="home"
            element={<Navigate to="/" replace />}
          />
          <Route
            path="*"
            element={<NotFounfPage />}
          />
        </Route>
      </Routes>
    </Router>,
  );
