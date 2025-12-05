import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/Loader/HomePage';
import { PeoplePage } from './components/Loader/PeoplePage';
import { PeopleTable } from './components/Loader/PeopleTable';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="people" element={<PeoplePage />}>
        <Route path=":slug" element={<PeopleTable />} />
      </Route>
      <Route path="*" element={<h1 className="title">Page not found</h1>} />
    </Route>
  </Routes>
);
