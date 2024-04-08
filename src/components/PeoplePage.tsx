import { FC, useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState('');

  useEffect(() => {
    const fetchPeople = async () => {
      setHasError('');

      try {
        const data = await getPeople();

        setPeople(data);
      } catch {
        setHasError('something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {hasError}
                </p>
              )}

              {!people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!people.length && <PeopleTable people={people} />}
            </>
          )}
        </div>
      </div>
    </>
  );
};
