import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import '../App.scss';
import { App } from '../App';
import { Home } from './Home';
import { PeoplePage } from './PeoplePage';
import { PeopleList } from './PeopleList';
import { PersonDetails } from './PersonDetails';
import { NotFound } from './NotFound';
export const Root: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />

          <Route path="people" element={<PeoplePage />}>
            <Route index element={<PeopleList />} />
            <Route path=":slug" element={<PersonDetails />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};
