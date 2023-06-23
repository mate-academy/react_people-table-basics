import React, { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoaded(true));
  }, []);

  const preparedPeople: Person[] = people.map(person => {
    const mother = people.find(m => m.name === person.motherName);
    const father = people.find(f => f.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });

  const isErrorMessageVisible = isLoaded && isError;
  const isNoPeopleMessageVisible = isLoaded && !isError && !people.length;
  const isPeopleTableVisible = isLoaded && !isError && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {!isLoaded && <Loader />}

          {isErrorMessageVisible && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isNoPeopleMessageVisible && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isPeopleTableVisible && (
            <PeopleTable people={preparedPeople} />
          )}
        </div>
      </div>
    </>
  );
};
