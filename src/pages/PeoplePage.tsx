/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PersonTable } from '../components/PersonTable';

export const PeoplePage: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople
      .then(people => setPersons(people))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {!isError && !isLoading && persons.length === 0
          && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
          {persons.length > 0
          && (
            <PersonTable
              persons={persons}
              selected={slug ?? '-'}
            />
          )}
        </div>
      </div>
    </>
  );
};
