import {
  Navigate, Route, HashRouter as Router, Routes,
} from 'react-router-dom';
import { Home } from './Pages/Home';
import { People } from './Pages/People';
import { App } from './App';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people">
            <Route path=":person?" element={<People />} />
          </Route>
          <Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          />
        </Route>
      </Routes>
    </Router>
  );
};
