import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PeopleTable } from './components/Loader/PeopleTable';
import { useContext } from 'react';
import { PeopleContext } from './stores/PeopleProvider';

export const Root = () => {
  const { people } = useContext(PeopleContext);

  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="*" element={<NotFoundPage />} />
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to=".." replace={true} />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route
            path="/people/:slug"
            element={<PeopleTable people={people} />}
          />
        </Route>
      </Route>
    </Routes>
  );
};
