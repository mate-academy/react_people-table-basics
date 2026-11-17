import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';
import { Loader } from '../Loader';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(loaded => {
        setPeople(
          loaded.map(person => ({
            ...person,
            mother: loaded.find(p => p.name === person.motherName),
            father: loaded.find(p => p.name === person.fatherName),
          })),
        );
      })
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

          {!isLoading && !hasError && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !hasError && people.length > 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
