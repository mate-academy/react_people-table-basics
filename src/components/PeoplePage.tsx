import { useEffect, useState } from 'react';
import { Loader } from './Loader/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

export function People() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    async function getDate() {
      setIsLoading(true);
      setIsError(false);
      try {
        const date = await getPeople();

        const result = date.map(person => {
          let fullPerson = { ...person };

          if (person.motherName) {
            const mother = date.find(per => per.name === person.motherName);

            fullPerson = { ...fullPerson, mother };
          }

          if (person.fatherName) {
            const father = date.find(per => per.name === person.fatherName);

            fullPerson = { ...fullPerson, father };
          }

          return fullPerson;
        });

        setPeople(result);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getDate();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length === 0 && !isError && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isError && !isLoading && people.length > 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
}
