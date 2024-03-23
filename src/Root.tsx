import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { HomePage } from './components/pages/HomePage';
import { PeoplePage } from './components/pages/PeoplePage';
import { App } from './App';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" />} />
        <Route path="/people" element={<PeoplePage />}>
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Route>
    </Routes>
  </Router>
);
