import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { PeopleLoadingError } from './PeopleLoadingError';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading && <Loader />}
      {error && <PeopleLoadingError />}
      {!isLoading && !error && <PeopleTable people={people} />}
    </>
  );
};
