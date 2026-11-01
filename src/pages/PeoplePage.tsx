import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

const preparePeople = (people: Person[]): Person[] => {
  const peopleByName = new Map(people.map(person => [person.name, person]));

  return people.map(person => ({
    ...person,
    mother: person.motherName ? peopleByName.get(person.motherName) : undefined,
    father: person.fatherName ? peopleByName.get(person.fatherName) : undefined,
  }));
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(loadedPeople => setPeople(preparePeople(loadedPeople)))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

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

          {!isLoading && !hasError && !people.length && (
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
