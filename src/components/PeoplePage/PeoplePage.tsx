import React, { memo, useEffect, useState } from 'react';
import { getPeople } from '../../api';

import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadedPeople = async () => {
    setIsLoading(true);

    try {
      const loadPeople = await getPeople();

      const preparedPeople = loadPeople.map(person => {
        const father = loadPeople.find(dad => person.fatherName === dad.name);
        const mother = loadPeople.find(mom => person.motherName === mom.name);

        return {
          ...person,
          father,
          mother,
        };
      });

      setPeople(preparedPeople);
    } catch {
      setError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadedPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      { error
        ? (
          <p
            data-cy="peopleLoadingError"
            className="has-text-danger"
          >
            Something went wrong
          </p>
        )
        : (
          <main className="section">
            <div className="container">
              <div className="block">
                <div className="box table-container">
                  {isLoading
                    ? <Loader />
                    : <PeopleTable people={people} />}
                </div>
              </div>
            </div>
          </main>
        )}
    </>
  );
});
