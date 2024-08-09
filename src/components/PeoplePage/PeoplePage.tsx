import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { getPeopleWithParents } from '../../services/getPeopleWithParents';
import { ErrorMessages } from '../../types/errorMessages';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPeople()
      .then(data => {
        const peopleWithParents = getPeopleWithParents(data);

        setPeople(peopleWithParents);
      })
      .catch(() => {
        setError(ErrorMessages.loadingError);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading && <Loader />}
      {!isLoading && error && (
        <p className="has-text-danger" data-cy="peopleLoadingError">
          {error}
        </p>
      )}
      {!isLoading && !error && people.length !== 0 && (
        <PeopleTable people={people} />
      )}
      {!isLoading && !error && !people.length && (
        <p data-cy="noPeopleMessage">No people</p>
      )}
    </>
  );
};
