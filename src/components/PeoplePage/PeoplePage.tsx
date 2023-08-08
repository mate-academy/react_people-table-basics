import { Outlet } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonInfo } from '../PersonInfo/PersonInfo';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const hasPeople = !loading && !errorMessage && people?.length !== 0;

  const findParent = useMemo(() => (parentName: string | null) => {
    return people?.find(person => person.name === parentName) || null;
  }, [people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <main className="section">
        <div className="container">
          <div className="block">
            <div className="box table-container">
              {loading && (
                <Loader />
              )}

              {!loading && errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!loading && !errorMessage && people?.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasPeople && (
                <table
                  data-cy="peopleTable"
                  className="
                    table is-striped is-hoverable is-narrow is-fullwidth
                  "
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Sex</th>
                      <th>Born</th>
                      <th>Died</th>
                      <th>Mother</th>
                      <th>Father</th>
                    </tr>
                  </thead>

                  <tbody>
                    {people?.map(person => (
                      <PersonInfo
                        person={person}
                        key={person.slug}
                        findParent={(parentName) => findParent(parentName)}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>

      <Outlet />
    </>
  );
};
