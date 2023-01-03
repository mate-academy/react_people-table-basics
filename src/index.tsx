import { createRoot } from 'react-dom/client';
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { PageNotFound } from './components/PageNotFound';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="*" element={<PageNotFound />} />
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people" element={(<PeoplePage />)}>
            <Route index element={(<PeoplePage />)} />
            <Route path=":slug" element={(<PeoplePage />)} />
          </Route>
        </Route>
      </Routes>
    </Router>,
  );
