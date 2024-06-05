import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setError('Something went wrong');
        setTimeout(() => setError(''), 3000);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {!people.length && !loading && !error && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!people.length && !loading && !error && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
