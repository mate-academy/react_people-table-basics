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
import { PeoplePage } from './components/PeoplePage';
import { Title } from './components/Title';
import { HomePage } from './components/HomePage';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<Title text="Page not found" />} />
        <Route path="home" element={<Navigate to={'/'} replace />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":name" element={<PeoplePage />} />
        </Route>
      </Route>
    </Routes>
  </Router>,
);
