import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { Home } from './pages/Home';
import { Page404 } from './pages/Page404';
import { People } from './pages/People';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="*" element={<Page404 />} />
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Navigate to="/" />} />
        <Route path="people">
          <Route path=":human?" element={<People />} />
        </Route>
      </Route>
    </Routes>
  </Router>
);
