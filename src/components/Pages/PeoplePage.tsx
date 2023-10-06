import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadPeople = async () => {
      const data = await getPeople();

      setPeople(data);
    };

    setIsLoading(true);
    loadPeople()
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isLoading && <Loader />}

        {error
        && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
        {people.length === 0 && !isLoading
        && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {people.length > 0 && <PeopleTable people={people} />}
      </div>
    </>
  );
};
