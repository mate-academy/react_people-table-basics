import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {isLoading && <Loader />}

        {!isLoading && !people.length && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!isLoading && <PeopleTable people={people} />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text=danger">
            Something went wrong
          </p>
        )}
      </div>
    </div>
  );
};
