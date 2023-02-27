import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { getPreparedPeople } from '../../utils/getPreparedPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isFetchError, setIsFetchError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPeople = async () => {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();
      const preparedPeople = getPreparedPeople(peopleFromServer);

      setPeople(preparedPeople);
    } catch (error) {
      setIsFetchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const isPeopleVisible = !isLoading && Boolean(people.length);
  const isNoPeopleMessageVisible = (
    !isLoading && !people.length && !isFetchError
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {isFetchError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isPeopleVisible && (
            <PeopleTable people={people} />
          )}

          {isNoPeopleMessageVisible && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
