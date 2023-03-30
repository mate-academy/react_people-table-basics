import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

import { getPeople } from '../api';
import { Person } from '../types';

const findPerson = (people: Person[], name: string) => {
  return people.find((person) => person.name === name);
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [hasNoDataError, setHasNoDataError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const fetchedPeople = await getPeople();
        const isEmptyResponse = !fetchedPeople.length;

        if (isEmptyResponse !== hasNoDataError) {
          setHasNoDataError(isEmptyResponse);
        }

        setPeople(fetchedPeople.map((person) => {
          const currentPerson = { ...person };
          const { fatherName, motherName } = person;

          if (motherName) {
            currentPerson.mother = findPerson(fetchedPeople, motherName);
          }

          if (fatherName) {
            currentPerson.father = findPerson(fetchedPeople, fatherName);
          }

          return currentPerson;
        }));
      } catch (err) {
        setHasLoadingError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {hasLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {hasNoDataError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {isLoading ? (
            <Loader />
          ) : (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </div>
  );
};
