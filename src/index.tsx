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
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import NotFoundPage from './components/NotFoundPage';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <main className="section">
    <div className="container" style={{ marginTop: '20px' }}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route index element={<HomePage />} />

            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  </main>,
);
