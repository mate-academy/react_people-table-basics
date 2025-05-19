import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { People } from './components/People/People';

export const Root = () => (
  <Router>
    <App>
      <Routes>
        <Route path="/">
          <Route index element={<h1 className="title">Home Page</h1>} />
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
          <Route path="home" element={<Navigate to={'/'} replace />} />
          <Route path="people" element={<People />}>
            <Route index />
            <Route path=":slug" />
          </Route>
        </Route>
      </Routes>
    </App>
  </Router>
);
