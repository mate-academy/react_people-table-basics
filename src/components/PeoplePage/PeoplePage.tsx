import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

function getPeopleWithParents(people: Person[]) {
  const copyPeople = [...people];

  for (const copyPerson of copyPeople) {
    people.forEach(person => {
      if (person.name === copyPerson.fatherName) {
        copyPerson.father = person;
      }

      if (person.name === copyPerson.motherName) {
        copyPerson.mother = person;
      }
    });
  }

  return copyPeople;
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPeople()
      .then(data => {
        const peopleWithParents = getPeopleWithParents(data);
        setPeople(peopleWithParents);
      })
      .catch(() => {
        setError('Loading error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading && <Loader />}
      {!isLoading && error && (
        <p className="has-text-danger" data-cy="peopleLoadingError">
          {error}
        </p>
      )}
      {!isLoading && !error && people.length !== 0 && (
        <PeopleTable people={people} />
      )}
      {!isLoading && !error && people.length === 0 && (
        <p data-cy="noPeopleMessage">No people</p>
      )}
    </>
  );
};
