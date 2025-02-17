import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { Home } from './pages/Home';
import { PageNotFound } from './pages/ErrorPage';
import { People } from './pages/People';
import { LoadingProvider } from './LoadingContext';

export const Root = () => (
  <Router>
    <LoadingProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="people" element={<People />}>
            <Route path=":personSlug" element={<People />}></Route>
          </Route>
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </LoadingProvider>
  </Router>
);
