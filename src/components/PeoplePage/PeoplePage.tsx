import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';

import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(fetchedPeople => {
        const peopleWithRelations = fetchedPeople.map(person => {
          const mother = fetchedPeople.find(
            p => p.name === person.motherName,
          ) as Person | undefined;
          const father = fetchedPeople.find(
            p => p.name === person.fatherName,
          ) as Person | undefined;

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeople(peopleWithRelations || []);
      })
      .catch(() => {
        setError('Failed to fetch people');
        // throw new Error('Failed to fetch people');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && people.length === 0 && !error && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length !== 0 && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
