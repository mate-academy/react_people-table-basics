import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

// import { App } from './App';
import { PeopleProvider } from './contexts/PeopleContext';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

import {
  Routes,
  Route,
  Navigate,
  // useNavigate,
} from 'react-router-dom';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <PeopleProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people">
            <Route path=":peopleId?" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </PeopleProvider>,
);
