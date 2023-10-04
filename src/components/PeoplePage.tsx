import React, { useEffect, useState } from 'react';
import { Person } from './types';
import { getPeople } from '../api';
import { PeopleList } from './PeopleList';
import { Loader } from './Loader';

export const PeoplePage: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPersons)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const preparedPeople = persons.map(person => {
    return {
      ...person,
      mother: persons.find(({ name }) => person.motherName === name),
      father: persons.find(({ name }) => person.fatherName === name),
    };
  });

  const isSomethingWrong = isError && !isLoading;
  const isLoaded = !isError && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {isSomethingWrong && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(!persons.length && isLoaded) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!!persons.length && (
            <PeopleList persons={preparedPeople} />
          )}
        </div>
      </div>
    </>
  );
};
