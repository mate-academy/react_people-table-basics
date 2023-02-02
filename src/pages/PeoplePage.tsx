import React, { memo, useEffect, useState } from 'react';
import { Loader } from '../components/Loader/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage: React.FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isPeopleLoaded, setIsPeopleLoaded] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((PeopleFromServer) => {
        const peopleWithParents: Person[] = PeopleFromServer.map(person => {
          const mother = PeopleFromServer
            .find(mom => mom.name === person.motherName);
          const father = PeopleFromServer
            .find(f => f.name === person.fatherName);

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeople(peopleWithParents);
        setIsPeopleLoaded(true);
      })
      .catch(() => setErrorMessage(true))
      .finally(() => setIsLoading(false));
  }, []);

  const hasNoPeople = !people.length && isPeopleLoaded;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage
            && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

          {hasNoPeople && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length !== 0 && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
});
