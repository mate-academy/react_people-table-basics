import { useEffect, useState } from 'react';
import { getPeople } from '../../../api';
import { Loader } from '../Loader/Loader';
import { Person } from '../../../types';
import { PeopleTable } from '../PeopleTable';
import React from 'react';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeopleFromServer)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const people: Person[] = peopleFromServer.map(person => ({
    ...person,
    mother: peopleFromServer.find(p => p.name === person.motherName),
    father: peopleFromServer.find(p => p.name === person.fatherName),
  }));

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !isLoading && !hasError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !hasError && !!people.length && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
