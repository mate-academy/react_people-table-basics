import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getPreparedPeople } from '../utils/findPeopleByName';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();

      setPeople(getPreparedPeople(peopleFromServer));
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const IS_TABLE_EMPTY = !people.length && !isLoading && !isError;
  const IS_LOADING_ERROR = isError && !isLoading;
  const HAS_PEOPLE_LIST = !!people?.length && !isError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {IS_LOADING_ERROR && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {IS_TABLE_EMPTY && (
            <p
              data-cy="noPeopleMessage"
            >
              There are no people on the server
            </p>
          )}

          {HAS_PEOPLE_LIST && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
