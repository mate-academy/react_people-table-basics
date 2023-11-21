import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PersonPage } from './pages/PeoplePage';
import { PeopleProvider } from './stores/PeopleContext';

export const Root = () => {
  return (
    <Router>
      <PeopleProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />

            <Route path="people">
              <Route index element={<PersonPage />} />
              <Route path=":slugPerson" element={<PersonPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </PeopleProvider>
    </Router>
  );
};
