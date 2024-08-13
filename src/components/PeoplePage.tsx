import { useEffect, useState } from 'react';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch (error) {
        setErrorMessage('Unable to load people');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const noDataAvailable = !isLoading && !errorMessage && people.length === 0;
  const dataAvailable = !isLoading && !errorMessage && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {!isLoading && errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}
          {noDataAvailable && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {dataAvailable && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
