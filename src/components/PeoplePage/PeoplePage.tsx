import { useState, useEffect } from 'react';
import { PeopleTable } from '../../components/PeopleTable';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadingPeople = async () => {
      setIsLoading(true);
      try {
        const data = await getPeople();

        setPeople(data);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadingPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}
      {hasError && <p data-cy="peopleLoadingError">Something went wrong</p>}
      {!isLoading && !hasError && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
      {!isLoading && !hasError && people.length > 0 && (
        <PeopleTable people={people} />
      )}
    </>
  );
};
