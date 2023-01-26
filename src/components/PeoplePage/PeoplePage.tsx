import React, {
  useState,
  useEffect,
  memo,
  useMemo,
} from 'react';

import { Loader } from '../Loader/Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';

export const PeoplePage: React.FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);

  const loadPeople = async () => {
    try {
      setIsLoading(true);

      const loadedPeople = await getPeople();

      setPeople(loadedPeople);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsLoadingFinish(true);
    }
  };

  useEffect(() => {
    setIsError(false);
    setIsLoadingFinish(false);
    loadPeople();
  }, []);

  const isNoPeopleOnServer = useMemo(() => (
    isLoadingFinish && !isError && !people.length
  ), [isLoadingFinish, isError, people]);

  const isPeopleOnServer = useMemo(() => (
    isLoadingFinish && !isError && people.length
  ), [isLoadingFinish, isError, people]);

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

          {isNoPeopleOnServer && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isPeopleOnServer && (
            <PeopleTable
              people={people}
            />
          )}
        </div>
      </div>
    </>
  );
});
