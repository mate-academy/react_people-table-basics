/* eslint-disable no-console */
import { FC, useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { fetchPeople } from '../../api';
import { Person } from '../../types';

const getParents = (
  { motherName, fatherName }: Person,
  array: Person[],
) => ({
  mother: array.find(({ name }) => name === motherName),
  father: array.find(({ name }) => name === fatherName),
});

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const isMessageVisible = people.length === 0 && !isLoading;
  const isListVisible = people.length > 0 && !isLoading;

  const getPeople = async () => {
    setIsLoading(true);
    try {
      const rawPeople = await fetchPeople();
      const preparedPeople = rawPeople.map(person => ({
        ...person,
        ...getParents(person, rawPeople),
      }));

      setPeople(preparedPeople);
    } catch (error) {
      console.error(error);

      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {isMessageVisible && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isListVisible && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
