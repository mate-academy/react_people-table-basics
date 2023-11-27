import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [newPeople, setNewPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(people => {
        return people.map(person => {
          const mother = people
            .find(({ name }) => name === person.motherName);

          const father = people
            .find(({ name }) => name === person.fatherName);

          return {
            ...person,
            mother,
            father,
          };
        });
      })
      .then(setNewPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const isDisplayErrorMessage = isError && !isLoading;

  const isNoPeopleOnServer = !newPeople.length && !isLoading && !isError;

  const isPeopleOnServer = !!newPeople.length && !isError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isDisplayErrorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isNoPeopleOnServer && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isPeopleOnServer && (
            <PeopleTable people={newPeople} />
          )}
        </div>
      </div>
    </>
  );
};
