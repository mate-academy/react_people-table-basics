import { useState, useEffect } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { Outlet } from 'react-router-dom';

export function PeoplePage() {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');

    getPeople()
      .then(setPeoples)
      .catch(error => setErrorMessage(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading && <Loader />}

      {errorMessage && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!isLoading && !errorMessage && !peoples.length && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!isLoading && !errorMessage && peoples.length > 0 && (
        <div className="block">
          <div className="box table-container">
            <Outlet context={peoples} />
          </div>
        </div>
      )}
    </>
  );
}
