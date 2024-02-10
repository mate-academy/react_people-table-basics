import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleList } from '../components/PeopleList';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await getPeople();

        setPeople(response);
      } catch (error) {
        setErrorMessage('There are no people on the server');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>

          {!errorMessage && (
            <p data-cy="noPeopleMessage">
              {errorMessage}
            </p>
          )}

          {!isLoading && (
            <PeopleList people={people} />
          )}
        </div>
      </div>
    </>
  );
};
