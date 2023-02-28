import './App.scss';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from './api';
import { Person } from './types/Person';
import { TablePage } from './Pages/TablePage';
import { HomePage } from './Pages/HomePage';
import { NavBar } from './components/NavBar/NavBar';
import { NotFoundPage } from './Pages/NotFoundPage ';

export const App: React.FC = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsloading] = useState(true);

  const getPeopleList = async () => {
    try {
      const result = await getPeople();

      setPeopleList(result);
      setIsloading(false);
    } catch {
      setIsloading(true);
      setIsError(true);
    }
  };

  useEffect(() => {
    getPeopleList();
  }, []);

  const peopleListWithParentsLinks = useMemo(() => {
    const result = [...peopleList].map(person => {
      const motherLink = peopleList
        .find(mother => mother.name === person.motherName);
      const fatherLink = peopleList
        .find(father => father.name === person.fatherName);

      return { ...person, mother: motherLink, father: fatherLink };
    });

    return result;
  }, [peopleList]);

  return (
    <div data-cy="app">
      <NavBar />
      <main className="section">
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/home"
            element={<Navigate to="/" replace />}
          />

          <Route path="people">
            <Route
              index
              element={(
                <TablePage
                  isLoading={isLoading}
                  isError={isError}
                  list={peopleListWithParentsLinks}
                />
              )}
            />
            <Route
              path=":personSlug"
              element={(
                <TablePage
                  isLoading={isLoading}
                  isError={isError}
                  list={peopleListWithParentsLinks}
                />
              )}
            />
          </Route>

          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </main>
    </div>
  );
};
