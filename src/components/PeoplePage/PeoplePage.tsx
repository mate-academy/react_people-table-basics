import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  // eslint-disable-next-line
  const URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

  const loadPeople = async () => {
    try {
      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const peopleData = await response.json();

      if (peopleData.length === 0) {
        setError('There are no people on the server');

        return;
      }

      setPeopleFromServer(peopleData);
    } catch {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}
          {error && peopleFromServer.length === 0 && (
            <p data-cy="noPeopleMessage">
              {error}
            </p>
          )}
          {!error && !isLoading && (
            <PeopleTable
              people={peopleFromServer}
            />
          )}

        </div>
      </div>
    </>
  );
};
