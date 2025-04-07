import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';
import { PeopleContextProvider } from './context/PeopleContext';

export const Root = () => (
  <PeopleContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route index element={<HomePage />} />

          <Route path="*" element={<NotFoundPage />} />

          <Route path="people">
            <Route path=":personId?" element={<PeoplePage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  </PeopleContextProvider>
);
