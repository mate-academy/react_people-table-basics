import { createRoot } from 'react-dom/client';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { PeopleTable } from './components/PeopleTable/PeopleTable';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <Routes>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/" element={<App />}>
          <Route index element={<h1 className="title">Home Page</h1>} />
          <Route path="people/personSlug?">
            <Route index element={<PeopleTable />} />
            <Route path=":personSlug" element={<PeopleTable />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>,
  );
