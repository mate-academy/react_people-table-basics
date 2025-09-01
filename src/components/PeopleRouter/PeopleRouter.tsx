import { Navigate, Route, Routes } from 'react-router-dom';
import { PeopleHomePage } from '../PeopleHomePage';
import { NotFoundPage } from '../NotFoundPage';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeopleRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PeopleHomePage />} />
      <Route path="/people" element={<PeopleTable />} />
      <Route path="/people/:slug" element={<PeopleTable />} />

      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
