import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [emptyServerMessage, setEmptyServerMessage] = useState('');

  useEffect(() => {
    getPeople()
      .then(resp => {
        if (resp.length === 0) {
          return setEmptyServerMessage('There are no people on the server');
        }

        return setPeople(resp);
      })
      .catch(error => {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('Something went wrong');
        }
      })
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

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {emptyServerMessage && (
            <p data-cy="noPeopleMessage">{emptyServerMessage}</p>
          )}
          {people.length > 0 && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
