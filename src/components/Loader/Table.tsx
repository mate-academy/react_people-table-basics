import { useEffect, useState } from 'react';
import * as peopleService from '../../api';
import { Person } from '../../types';
import { Loader } from './Loader';
import { PeoplesList } from '../PeoplesList';

export const Table = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const getPeoples = () => {
    return peopleService.getPeople()
      .then(peopleFromServer => setPeoples(peopleFromServer))
      .catch(() => setErrorMessage('Something went wrong'))
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
          {isLoading && (
            <Loader />
          )}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!isLoading && peoples.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoading && (
            <PeoplesList peoples={peoples} />
          )}
        </div>
      </div>
    </>
  );
};
