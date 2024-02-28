import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {loader && <Loader />}

            {error && !loader && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {error}
              </p>
            )}

            {!loader && people.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {people.length > 0 && <PeopleTable people={people} />}
          </div>
          <Outlet />
        </div>
      </div>
    </main>
  );
};
