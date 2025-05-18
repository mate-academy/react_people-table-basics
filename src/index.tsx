import { createRoot } from 'react-dom/client';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { PeopleProvider } from './context/PeopleProvider';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';
import { People } from './components/People';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <PeopleProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="people" element={<People />}>
            <Route path=":slugs" element={<People />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="home" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </PeopleProvider>
  </Router>,
);
