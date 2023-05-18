import {
  useCallback, useEffect, useState,
} from 'react';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import { Loader } from '../Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const loadPeople = useCallback(async () => {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setError('Something went wrong');
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error}
        </p>
      )}

      {!error && (
        isLoading
          ? <Loader />
          : <PeopleTable people={people} />
      )}
    </>
  );
};
