import React, { useState, useEffect } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { ErrorType } from '../types/ErrorType';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<ErrorType>(ErrorType.NONE);

  const showError = (error: ErrorType) => {
    setIsError(error);
    setTimeout(() => setIsError(ErrorType.NONE), 3000);
  };

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        const personWithParents = data.map(person => {
          const mother = data.find(mom => mom.name === person.motherName);
          const father = data.find(dad => dad.name === person.fatherName);

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeople(personWithParents);
      })
      .catch(() => showError(ErrorType.LOAD))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">
        People Page
      </h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {isError}
            </p>
          )}

          {!!people.length && <PeopleTable people={people} />}

          {!isLoading && !isError && !people.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
