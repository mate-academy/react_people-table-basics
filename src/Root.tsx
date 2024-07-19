import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';

import { Home } from './components/Home';
import { People } from './components/People';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="people/:selected?" element={<People />} />
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Route>
      <Route path="/home" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);
