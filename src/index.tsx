import { createRoot } from 'react-dom/client';
import {
  Navigate, Route, HashRouter as Router, Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { HomePage } from './Pages/HomePage';
import { PageNotFound } from './Pages/Page404';
import { PeopleTable } from './components/People/People';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="people">
          <Route index element={<PeopleTable />} />
          <Route path=":personSlug" element={<PeopleTable />} />
        </Route>
      </Route>
    </Routes>
  </Router>,
);
