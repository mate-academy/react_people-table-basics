import { useEffect, useState } from 'react';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { ErrorNotification } from '../../types/ErrorNotification';
import { Loader } from '../Loader';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorNotification | null>(null);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(ErrorNotification.LoadError))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isLoading && <Loader />}
        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {ErrorNotification.LoadError}
          </p>
        )}
        {!isLoading && !error && !people.length && (
          <p data-cy="noPeopleMessage">{ErrorNotification.NoPeople}</p>
        )}
        {!isLoading && !error && people.length && (
          <PeopleTable people={people} />
        )}
      </div>
    </div>
  );
};
