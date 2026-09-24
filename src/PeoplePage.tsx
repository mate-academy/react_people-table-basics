import { useEffect, useState } from 'react';
import { People } from './components/People';
import { Person } from './types';
import { getPeople } from './api';
import { Loader } from './components/Loader';

export const PeoplePage = () => {
  const [person, setPerson] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        setPerson(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(false), 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="section">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {isLoading && <Loader />}
          {!error && !isLoading && person.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {!error && !isLoading && person.length > 0 && (
            <People persons={person} />
          )}
        </div>
      </div>
    </div>
  );
};
