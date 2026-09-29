import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = React.memo(function PeoplePage() {
  const [allPeople, setAllPeople] = useState<Person[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(true);

  const normalizePeople = useCallback((data: Person[]): Person[] => {
    const people = [...data];

    const peopleByName = new Map(people.map(person => [person.name, person]));

    for (const person of people) {
      const mother =
        person.motherName !== null ? peopleByName.get(person.motherName) : null;
      const father =
        person.fatherName !== null ? peopleByName.get(person.fatherName) : null;

      if (mother !== null) {
        person.mother = mother;
      }

      if (father !== null) {
        person.father = father;
      }
    }

    return people;
  }, []);

  useEffect(() => {
    setIsRendering(true);
    getPeople()
      .then(people => {
        setAllPeople(normalizePeople(people));
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsRendering(false));
  }, [normalizePeople]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isRendering ? (
            <Loader />
          ) : errorMessage || !allPeople ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          ) : allPeople.length === 0 ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
            <PeopleTable people={allPeople} />
          )}
        </div>
      </div>
    </>
  );
});
