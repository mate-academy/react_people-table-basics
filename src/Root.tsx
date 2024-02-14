import {
  Navigate,
  Route,
  HashRouter as Router, Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { Error } from './components/Error';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":peopleSlug?" />
        </Route>
        <Route path="home" element={<Navigate to="/" />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  </Router>
);
