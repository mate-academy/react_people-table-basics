import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Home } from './Home';
import { NotFoundPage } from './NotFoundPage';
import { People } from '../components/People';
import { App } from '../App';

export const Roots = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="people/:personId?" element={<People />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
    </Router>
  );
};
