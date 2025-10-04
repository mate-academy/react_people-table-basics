import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
// import { App } from './App';
import { HomePage } from './components/Loader/pages/HomePage';
import { App } from './App';
import { PeoplePage } from './components/Loader/pages/PeoplePage';
import { NotFoundPage } from './components/Loader/pages/NotFoundPage';
import { PersonDetails } from './components/Loader/pages/PersonDetails';

export const Root = () => (
  <Router>
    <Routes>
      {/* App should have navbar only + Outlets */}
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":slug" element={<PersonDetails />} />
        </Route>

        <Route path="home" element={<Navigate to="/" replace />} />

        {/* Not existing page */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
