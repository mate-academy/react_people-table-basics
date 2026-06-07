import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const errorMessage = 'Something went wrong';
  const hasNoPeople = !error && !loading && people.length === 0;

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(peopleFromAPI => {
        setPeople(peopleFromAPI);
        setError(null);
      })
      .catch(() => setError(errorMessage))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            {loading && <Loader />}

            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {error}
              </p>
            )}

            {hasNoPeople && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {people.length > 0 && <PeopleTable people={people} />}
          </div>
        </div>
      </div>
    </main>
  );
};
