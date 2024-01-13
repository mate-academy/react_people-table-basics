import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PersonList } from '../PersonList';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people?.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people && people.length > 0 && (<PersonList people={people} />)}
        </div>
      </div>
    </div>
  );
};
