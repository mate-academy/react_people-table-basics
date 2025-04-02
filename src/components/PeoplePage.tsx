import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleList } from './PeopleList';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const getPeoples = () => {
    return getPeople()
      .then(peopleFromServer => setPeoples(peopleFromServer))
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getPeoples();
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

          {!isLoading && peoples.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && <PeopleList peoples={peoples} />}
        </div>
      </div>
    </>
  );
};
