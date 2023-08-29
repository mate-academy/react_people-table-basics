import { useMemo, useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsError(false);
    setIsloading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsloading(false));
  }, []);

  const preparedPeople = useMemo(() => {
    return people
      .map(person => {
        const mother = people
          .find(mom => mom.name
        === person.motherName) || null;
        const father = people
          .find(dad => dad.name === person.fatherName) || null;

        return {
          ...person,
          mother,
          father,
        };
      });
  }, [people]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && isError && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !isError && people.length < 1 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoading && !isError && people.length > 0 && (
            <PeopleTable people={preparedPeople} />
          )}

        </div>
      </div>

    </>
  );
};
