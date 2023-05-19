import { useCallback, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Nav } from './components/Nav';
import { PeopleTable } from './components/PeopleTable/PeopleTable';
import { Person } from './types';
import { getPeople } from './api';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const findPeopleWithParents = (peopleFromServer: Person[]) => {
    const peopleWithParents = peopleFromServer.map(child => {
      const mother = peopleFromServer.find(
        parent => parent.name === child.motherName,
      );
      const father = peopleFromServer.find(
        parent => parent.name === child.fatherName,
      );

      return {
        ...child,
        mother,
        father,
      };
    });

    setPeople(peopleWithParents);
  };

  const fetchPeople = useCallback(async () => {
    try {
      setIsLoading(true);
      await getPeople().then(data => findPeopleWithParents(data));
    } catch {
      setError('load');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div data-cy="app">
      <Nav />
      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<h1 className="title">Home Page</h1>}
            />

            <Route
              path="people"
              element={(
                <PeopleTable
                  people={people}
                  error={error}
                  isLoading={isLoading}
                  fetchPeople={fetchPeople}
                />
              )}
            />
            <Route path="/people">
              <Route
                index
                element={(
                  <PeopleTable
                    people={people}
                    error={error}
                    isLoading={isLoading}
                    fetchPeople={fetchPeople}
                  />
                )}
              />
              <Route
                path=":personSlug"
                element={(
                  <PeopleTable
                    people={people}
                    error={error}
                    isLoading={isLoading}
                    fetchPeople={fetchPeople}
                  />
                )}
              />
            </Route>

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
