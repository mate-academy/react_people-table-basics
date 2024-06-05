import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PersonLink } from '../components/PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(loadedPeople => {
        const lPeople = loadedPeople.map(person => {
          const personMother = loadedPeople.find(
            currPerson => currPerson.name === person.motherName,
          );
          const personFather = loadedPeople.find(
            currPerson => currPerson.name === person.fatherName,
          );

          return { ...person, mother: personMother, father: personFather };
        });

        setPeople(lPeople);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {Boolean(people.length) && <PersonLink people={people} />}
        </div>
      </div>
    </>
  );
};
