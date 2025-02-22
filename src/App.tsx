import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Navigation } from './components/Navigation/Navigation';
import { PeoplePage } from './PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Routes>
        <Route element={<Navigation />}>
          <Route index element={<h1 className="title">Home Page</h1>} />
          <Route path="home" element={<Navigate replace to={'/'} />} />

          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":peopleId" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Route>
      </Routes>
    </div>
  );
};
