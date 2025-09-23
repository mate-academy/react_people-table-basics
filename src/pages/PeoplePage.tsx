import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingError, setLoadingError] = useState('');

  useEffect(() => {
    setLoadingError('');
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setLoadingError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {loadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {loadingError}
            </p>
          )}

          {!loading &&
            !loadingError &&
            (people.length > 0 ? (
              <PeopleTable people={people} />
            ) : (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ))}
        </div>
      </div>
    </>
  );
};
