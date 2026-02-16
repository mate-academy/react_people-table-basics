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
import { HomePage } from './components/HomePage';
import { SomethingWrong } from './components/SomethingWrong';
import { PeopleTablePage } from './components/PeopleTablePage';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="people">
          <Route index element={<PeopleTablePage />} />
          <Route path=":person" element={<PeopleTablePage />} />
        </Route>
        <Route path="*" element={<SomethingWrong />} />
      </Route>
    </Routes>
  </Router>,
);
