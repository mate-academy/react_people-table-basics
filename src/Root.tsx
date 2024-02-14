import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { NotFoundPage } from './components/Loader/Pages/NotFound';
import { PeoplePage } from './components/Loader/Pages/PeoplePage';
import { Home } from './components/Loader/Pages/Home';
import { App } from './App';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/" element={<App />}>
        <Route
          index
          element={<Home />}
        />
        <Route path="people">
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
