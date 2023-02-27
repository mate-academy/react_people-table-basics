import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';

import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { getPeopleWithParents } from '../../utils/getPeopleWithParents';

export const People: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getPeopleFromServer = useCallback(
    async () => {
      try {
        setIsLoading(true);
        const peopleFromServer = await getPeople();

        setPeople((cur) => [...cur, ...peopleFromServer]);
      } catch {
        setIsError(true);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  const peopleWithParents = useMemo(
    () => getPeopleWithParents(people), [people],
  );

  const isWrong = !isLoading && people.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {isWrong && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
          {people.length > 0 && (
            <PeopleTable people={peopleWithParents} />
          )}
        </div>
      </div>
    </>
  );
};
