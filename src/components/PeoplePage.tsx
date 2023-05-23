/* eslint-disable linebreak-style */
import { useCallback, useEffect, useState } from 'react';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const getPeopleFromServer = useCallback(async () => {
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch (error) {
      setIsLoadingError(true);
    }
  }, []);

  useEffect(() => {
    getPeopleFromServer();
  }, [getPeopleFromServer]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {isLoadingError ? (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          ) : (
            <PeopleTable
              isLoadingError={isLoadingError}
              people={people}
            />
          )}
        </div>
      </div>
    </>
  );
};
