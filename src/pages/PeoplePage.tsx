import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);

      try {
        const response = await getPeople();

        setPeople(response);
      } catch {
        setError('Something went wrong');
      }

      setIsLoading(false);
    };

    fetchPeople();
  }, []);

  const visiblePeople = people.map(person => {
    const mother = people.find(m => person.motherName === m.name);
    const father = people.find(f => person.fatherName === f.name);

    return {
      ...person,
      mother,
      father,
    };
  });

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {!isLoading && !error && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {visiblePeople.length > 0 && <PeopleTable people={visiblePeople} />}
        </div>
      </div>
    </>
  );
};
