import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(response => {
        setPeople(response.map(person => {
          const result = person;

          const mother = response.find(
            parent => parent.name === person.motherName,
          );

          const father = response.find(
            parent => parent.name === person.fatherName,
          );

          if (mother) {
            result.mother = mother;
          }

          if (father) {
            result.father = father;
          }

          return result;
        }));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {!isLoading && !isError && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoading && !isError && people.length !== 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  )
};
