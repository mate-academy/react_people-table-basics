import { Navigate, HashRouter as Router } from 'react-router-dom';
import { PeopleProvider } from './Contexts/PeopleContext';
import { App } from './App';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { NotFoundPage } from './Pages/NotFound';
import { PeoplePage } from './Pages/PeoplePage';

export const Root = () => {
  return (
    <Router>
      <PeopleProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="people" element={<PeoplePage />} />
            <Route path="people/:personSlug" element={<PeoplePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/home" element={<Navigate to="/" replace />} />
        </Routes>
      </PeopleProvider>
    </Router>
  );
};
