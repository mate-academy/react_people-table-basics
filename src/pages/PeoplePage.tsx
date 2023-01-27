import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getPreparedPeople } from '../helpers/getPreparedPeople';

export const PeoplePage: React.FC = React.memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadPeople = async () => {
    setIsLoading(true);

    try {
      const loadedPeople = await getPeople();

      const preparedPeople = getPreparedPeople(loadedPeople);

      setPeople(preparedPeople);
      setIsDataLoaded(true);
    } catch (error) {
      setErrorMessage('Can\'t load people');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const isLoadedPeopleExist = isDataLoaded && people.length;
  const isLoadedPeopleNotExist = isDataLoaded && !people.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {isLoadedPeopleNotExist && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isLoadedPeopleExist && (
            <PeopleTable
              people={people}
            />
          )}
        </div>
      </div>
    </>
  );
});
