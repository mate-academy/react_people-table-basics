import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
    setLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {!loading && hasError && people.length === 0 && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && !hasError && people.length === 0 && (
            <p data-cy="noPeopleMessage">No people available</p>
          )}

          {!loading && !hasError && people.length > 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </div>
  );
};
