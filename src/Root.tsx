import {
  Navigate, Route, HashRouter as Router, Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/Loader/pages/HomePage';
import { PeoplePage } from './components/Loader/pages/PeoplePage';
import { NotFoundPage } from './components/Loader/pages/NotFoundPage';
import { UsersProvider } from './store/peopleContext';

export const Root = () => (
  <Router>
    <UsersProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" />} />

          <Route
            path="people"
            element={<PeoplePage />}
          >
            <Route path=":slugId" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </UsersProvider>
  </Router>
);
