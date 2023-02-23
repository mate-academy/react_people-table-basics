import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadPeople = async () => {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setHasLoadingError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setHasLoadingError(false);
    loadPeople();
  }, []);

  const setPeopleWithParents = (peopleFromServer: Person[]) => {
    const peopleWithParents = peopleFromServer.map(person => {
      const mother = people.find(mum => mum.name === person.motherName);
      const father = people.find(dad => dad.name === person.fatherName);

      return {
        ...person,
        mother,
        father,
      };
    });

    return peopleWithParents;
  };

  const peopleWithParents = setPeopleWithParents(people);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {hasLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(people.length === 0 && !hasLoadingError && !isLoading) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
            <PeopleTable
              people={peopleWithParents}
            />
          )}
        </div>
      </div>
    </>
  );
};
