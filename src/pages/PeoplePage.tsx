import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(peopleFromServer => setPeople(peopleFromServer))
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            {loading ? (
              <Loader />
            ) : error ? (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {error}
              </p>
            ) : people.length === 0 ? (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ) : (
              <PeopleTable people={people} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
