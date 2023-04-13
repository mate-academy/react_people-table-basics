import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

const getPeopleWithParents = (people: Person[]) => {
  return people.map(person => ({
    ...person,
    mother: people.find(woman => woman.name === person.motherName) || null,
    father: people.find(man => man.name === person.fatherName) || null,
  }));
};

export const People: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const loadPeople = async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();
      const peopleWithParents = getPeopleWithParents(peopleFromServer);

      setPeople(peopleWithParents);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {isLoading && (
            <Loader />
          )}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !isLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
