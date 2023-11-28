import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { People } from './components/People';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people">
          <Route index element={<People />} />
          <Route path=":slug" element={<People />} />
        </Route>
        <Route
          path="*"
          element={<h1 className="title">Page not found</h1>}
        />
      </Route>
    </Routes>
  </Router>
);
