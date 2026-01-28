import { createRoot } from 'react-dom/client';
import {
  Navigate,
  Route,
  HashRouter as HashRouter,
  Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { HomePage } from './components/HomePage/HomePage';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { PeopleTable } from './components/PeopleTable/PeopleTable';
import { PeopleProvider } from './components/PeopleContext/PeopleContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <HashRouter>
    <PeopleProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />}></Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people">
            <Route index element={<PeopleTable />} />
            <Route path=":selectedPerson" element={<PeopleTable />} />
          </Route>
        </Route>
      </Routes>
    </PeopleProvider>
  </HashRouter>,
);
