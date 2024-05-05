import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';

export const People: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setIsLoading(true);
        await getPeople().then(setPeople);
      } catch {
        setErr(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {err && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !people?.length && !err && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!people?.length && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
