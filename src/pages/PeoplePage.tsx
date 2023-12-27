import { useEffect, useState } from 'react';

import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import type { Person } from '../types';
import { Loader } from '../components/Loader';

function getPersonByName(name: string, people: Person[]) {
  return people.find(person => person.name === name);
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const peopleToRender: Person[] = people
    ? people.map(person => {
      const personCopy = { ...person };

      if (person.motherName) {
        personCopy.mother = getPersonByName(person.motherName, people);
      }

      if (person.fatherName) {
        personCopy.father = getPersonByName(person.fatherName, people);
      }

      return personCopy;
    })
    : [];

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

          {people && (
            <>
              {peopleToRender.length
                ? <PeopleTable people={peopleToRender} />
                : (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
            </>
          )}

        </div>
      </div>
    </>
  );
};
