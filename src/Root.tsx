import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { PeopleProvider } from './store/PeopleContext';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { App } from './App';

export const Root = () => (
  <Router>
    <PeopleProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/people/:personSlug?" element={<PeoplePage />} />
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Route>
      </Routes>
    </PeopleProvider>
  </Router>
);
