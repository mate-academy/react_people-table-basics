import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../services/api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [users, setUsers] = useState<Person[]>([]);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    getPeople()
      .then(response => {
        setUsers(response);
        setIsLoading(false);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage.length > 0 && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {users.length === 0 && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && errorMessage.length === 0 && <PeopleTable users={users} />}
        </div>
      </div>
    </>
  );
};
