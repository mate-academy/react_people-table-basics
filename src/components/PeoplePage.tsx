import { useState, useEffect } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

const findPerson = (people: Person[], name: string) => {
  return people.find((person) => person.name === name) || undefined;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [hasNoDataError, setHasNoDataError] = useState(false);

  const getPeopleFromServer = async () => {
    try {
      setIsLoading(true);
      const fetchedPeople = await getPeople();
      const isEmptyResponse = fetchedPeople.length === 0;

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
    } catch {
      setHasLoadingError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <div className="container">
      <h1 className="title">
        People Page
      </h1>

      <div className="block">
        <div className="box table-container">
          {hasLoadingError && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {hasNoDataError && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isLoading && (
            <Loader />
          )}

          {!hasLoadingError && !hasNoDataError && !isLoading && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </div>
  );
};
