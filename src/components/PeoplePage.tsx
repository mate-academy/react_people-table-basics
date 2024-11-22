import React, { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [activePerson, setActivePerson] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getPeople()
      .then((data: Person[]) => {
        const enhancedPeople = data.map((person: Person) => ({
          ...person,
          mother:
            data.find((p: Person) => p.name === person.motherName) || undefined,
          father:
            data.find((p: Person) => p.name === person.fatherName) || undefined,
        }));

        setPeople(enhancedPeople);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <h1 className="title">People Page</h1>
      {isLoading && <p data-cy="loader">Loading...</p>}
      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error}
        </p>
      )}
      {!isLoading && !error && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
      {!isLoading && !error && people.length > 0 && (
        <PeopleTable
          people={people}
          activePerson={activePerson}
          onPersonSelect={setActivePerson}
        />
      )}
    </div>
  );
};
