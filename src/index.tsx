import { createRoot } from 'react-dom/client';
import {
  Route,
  HashRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />}></Route>
        <Route path="/home" element={<Navigate to="/" replace />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
        <Route path="people">
          <Route index element={<PeoplePage />}></Route>
          <Route path=":personId" element={<PeoplePage />}></Route>
        </Route>
      </Route>
    </Routes>
  </Router>,
);
