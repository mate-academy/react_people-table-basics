import { useState, useEffect } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { ErrorMessages } from '../../types/ErrorMessages';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorMessages | null>(null);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(ErrorMessages.LoadError))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isLoading && <Loader />}
        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {ErrorMessages.LoadError}
          </p>
        )}
        {!isLoading && !error && !people.length && (
          <p data-cy="noPeopleMessage">{ErrorMessages.NoPeople}</p>
        )}
        {!isLoading && !error && people.length && (
          <PeopleTable people={people} />
        )}
      </div>
    </div>
  );
};
