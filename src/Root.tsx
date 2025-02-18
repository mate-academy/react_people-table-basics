import {
  Route,
  Routes,
  Navigate,
  HashRouter as Router,
} from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { App } from './App';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<h1 className="title">Home Page</h1>} />
        <Route path="home" element={<Navigate to={'/'} replace />} />
        <Route path="/people">
          <Route path=":currSlug?" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Route>
    </Routes>
  </Router>
);
