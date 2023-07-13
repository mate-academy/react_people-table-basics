import { FC, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getLoadedPeople = async () => {
    try {
      setIsLoading(true);
      const loadedPeople = await getPeople();

      setPeople(loadedPeople);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLoadedPeople();
  }, []);

  const isPeopleListEmpty = !people.length && !isLoading;
  const isPeopleListNotEmpty = people.length > 0 && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isPeopleListEmpty && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isPeopleListNotEmpty && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
