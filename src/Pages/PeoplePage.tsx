import React, { memo, useState, useEffect } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage:React.FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setIsLoading(true);
        const response = await getPeople();

        const peopleWithParents = response.map(person => {
          const father = response.find(f => f.name === person.fatherName);
          const mother = response.find(m => m.name === person.motherName);

          return (
            {
              ...person,
              father,
              mother,
            }
          );
        });

        setPeople(peopleWithParents);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}

            {error && (
              <p
                data-cy="peopleLoadingError"
                className="has-text-danger"
              >
                Something went wrong
              </p>
            )}

            {!isLoading && !error && people.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {people.length > 0 && (
              <PeopleTable people={people} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
