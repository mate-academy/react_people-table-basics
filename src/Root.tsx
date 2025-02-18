import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { PeopleProvider } from './store/PeopleContext';

const HomeRedirect = () => {
  return <Navigate to="/" replace />;
};

export const Root = () => (
  <Router>
    <PeopleProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/home" element={<HomeRedirect />}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/people/:slug?" element={<PeoplePage />}></Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Route>
      </Routes>
    </PeopleProvider>
  </Router>
);
