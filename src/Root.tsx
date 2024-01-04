import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage/home-page';
import { PeoplePage } from './components/PeopleTable/PeopleTable';
import { Layout } from './components/LayOut/LayOut';
import { Page404 } from './components/NotFoundPage/NotFoundPage';

export const Root = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="people" element={<PeoplePage />}>
        <Route path=":slug" element={<PeoplePage />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Route>

  </Routes>
);
