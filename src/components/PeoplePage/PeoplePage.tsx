import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(res => {
        setPeople(res.map(person1 => {
          const result = person1;

          const mother = res.find(
            persone2 => persone2.name === person1.motherName,
          );

          const father = res.find(
            persone2 => persone2.name === person1.fatherName,
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
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
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
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoading && !error && people.length !== 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
