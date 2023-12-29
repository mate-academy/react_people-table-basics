import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';

export const PeopleList = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {loading && <Loader />}

        {(people && people.length) && <PeopleTable people={people} />}

        {(people && !people.length) && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {hasError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
      </div>
    </div>
  );
};
