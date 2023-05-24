import React, { useState, useEffect } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople, getPerson } from '../../api';
import { ErrorType } from '../../types/ErrorType';
import { PeopleList } from '../PeopleList/PeopleList';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState<ErrorType | null>(null);


  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peopleFromServer) => {
        if (peopleFromServer.length === 0) {
          setHasError(ErrorType.EmptyData);
          return;
        }

      const peopleWithParents = peopleFromServer.map((person) => ({
        ...person,
        mother: getPerson(peopleFromServer, person.motherName),
        father: getPerson(peopleFromServer, person.fatherName),
      }));

      setPeople(peopleWithParents);
    })
    .catch(() => setHasError(ErrorType.LoadingError))
    .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {hasError === ErrorType.LoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {ErrorType.LoadingError}
            </p>
          )}

          {hasError === ErrorType.EmptyData && (
            <p data-cy="noPeopleMessage">
              {ErrorType.EmptyData}
            </p>
          )}

          {isLoading ? (
            <Loader />
          ) : (
            <PeopleList people={people} />
          )}
        </div>
      </div>
    </>
  );
};
