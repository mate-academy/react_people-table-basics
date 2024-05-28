import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import People from './pages/People';
import HomePage from './pages/HomePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to={'/'} replace />} />
        <Route path="/people">
          <Route path=":name?" element={<People />} />
        </Route>

        <Route path="/*" element={<h1 className="title">Page not found</h1>} />
      </Route>
    </Routes>
  </Router>
);
